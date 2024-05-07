# 取色器的实现
## 前端页面
1. 色板自选
2. 动态关联RGB、CMYK
3. 点击取色，弹出小窗口屏幕取色

## native能力
1. 新的小窗口放大鼠标周围的像素
2. 鼠标移动时，动态更新

### 开发记录
20240507：
使用xcap，成功截图并拿到了鼠标周围的像素，但是xcap截图的逻辑是先全屏截图，然后人工去切分出想要的位置，但是效率太差了，大概需要不到200ms。针对性能及体验来说肯定是不行的，针对这种情况大致有两种处理方案
1. 第一种：截全图，监听按键、窗口切换、按键等，一旦有变化就保存当前像素，然后取消监听。
2. 第二种：针对不同的平台自己封装对应的方法（我看xcap在实现mac截图的时候就写的比较死，看`core-graphics`中方法还是可以截部分图的，性能应该可以高很多）,简单测试了一下（仅针对mac场景），速度由原来的180ms提升到8ms左右，提升了接近20倍！！！

第二种方法的测试代码
```rust
use std::fmt::{Debug, LowerExp, LowerHex};
use mouse_position::mouse_position::{Mouse};
use std::thread;
use std::time::{Duration, Instant};
use core_graphics::display::{CGRect, CGPoint, CGSize, kCGWindowImageDefault};
use core_graphics::window::create_image;
use xcap::{Monitor, XCapError, XCapResult};
use xcap::image::{Pixel, Rgb, RgbaImage};

fn get_single_pixel_color(image: &RgbaImage, x: u32, y: u32) -> (u8, u8, u8) {
    let pixel = image.get_pixel_checked(x, y);
    let mut pixel_rgb: Rgb<u8> = match pixel {
        Some(result) => {
            result.to_rgb()
        },
        None => {
            Rgb([0, 0, 0])
        },
    };
    (pixel_rgb[0], pixel_rgb[1], pixel_rgb[2])
}

// 截取鼠标周围7个像素点距离的像素
fn get_pixel_color(x: i32, y: i32) -> Vec<Vec<(u8, u8, u8)>> {

    let start1 = Instant::now(); // 记录开始时间
    let monitor = Monitor::from_point(x, y).unwrap();
    let image = monitor.capture_image().unwrap();
    let duration = start1.elapsed(); // 计算经过的时间
    println!("运行时间11111: {:?}", duration);

    let mut array: Vec<Vec<(u8, u8, u8)>> = vec![vec![(0, 0, 0); 15]; 15];
    let starting_point = ((x - 7) as u32 , (y - 7) as u32);
    for i in 0..=14 {
        for j in 0..=14 {
            array[i][j] = get_single_pixel_color(&image, starting_point.0 + i as u32, starting_point.1 + j as u32);
        }
    }
    let start2 = Instant::now(); // 记录开始时间
    let image2 = get_snapshot((x - 7) as f64, (y - 1) as f64).unwrap();
    let duration = start2.elapsed(); // 计算经过的时间
    println!("运行时间2222: {:?}", duration);

    image2.save("target/mouse2.png");

    array
}

fn get_snapshot(x: f64, y: f64) -> XCapResult<RgbaImage> {
    let cg_rect = CGRect::new(&CGPoint::new(x as f64, y as f64), &CGSize::new(15., 15.));
    let cg_image = create_image(cg_rect, 0, 0, kCGWindowImageDefault)
        .ok_or_else(|| XCapError::new(format!("Capture failed {} {:?}", 0, cg_rect)))?;

    let width = cg_image.width();
    let height = cg_image.height();
    let bytes = Vec::from(cg_image.data().bytes());

    // Some platforms e.g. MacOS can have extra bytes at the end of each row.
    // https://github.com/nashaofu/xcap/issues/29
    // https://github.com/nashaofu/xcap/issues/38
    let mut buffer = Vec::with_capacity(width * height * 4);
    for row in bytes.chunks_exact(cg_image.bytes_per_row()) {
        buffer.extend_from_slice(&row[..width * 4]);
    }

    for bgra in buffer.chunks_exact_mut(4) {
        bgra.swap(0, 2);
    }

    RgbaImage::from_raw(width as u32, height as u32, buffer)
        .ok_or_else(|| XCapError::new("RgbaImage::from_raw failed"))
}

pub fn main() {
    // 启动一个新的线程来运行定时器
    thread::spawn(|| {
        // 定时器间隔为1秒
        let interval = Duration::from_secs(10);
        // 记录开始时间
        let mut last_time = Instant::now();

        loop {
            // 当前时间
            let current_time = Instant::now();
            // 计算与上次触发时间的间隔
            let elapsed = current_time.duration_since(last_time);

            // 如果间隔大于等于定时器间隔，则触发事件
            if elapsed >= interval {
                // 这里可以放置你想要定时执行的代码
                println!("定时器触发");
                // 调用获取位置函数
                if let Ok(position) = get_position() {
                    println!("Position: {:?}", position);
                    let start = Instant::now(); // 记录开始时间
                    get_pixel_color(position.x, position.y);
                    let duration = start.elapsed(); // 计算经过的时间
                    println!("运行时间: {:?}", duration);
                }
                // 更新上次触发时间
                last_time = current_time;
            }

            // 等待一小段时间，防止循环过于密集
            thread::sleep(Duration::from_millis(10000));
        }
    });

    // 主线程继续执行其他任务
    loop {
        // 这里可以放置主线程的其他逻辑
        println!("主线程执行其他任务");

        // 等待一小段时间，防止主循环过于密集
        thread::sleep(Duration::from_secs(2));
    }

}

// 定义鼠标位置结构体
#[derive(Debug)]
struct MousePosition {
    x: i32,
    y: i32,
}

// 模拟获取鼠标位置的函数
fn get_mouse_position() -> Result<MousePosition, &'static str> {
    let position = Mouse::get_mouse_position();
    // 假设获取鼠标位置成功
    let x = 100;
    let y = 200;
    // 返回鼠标位置
    match position {
        Mouse::Position { x, y } => Ok(MousePosition { x, y }),
        Mouse::Error => {
            println!("Error getting mouse position");
            return Ok(MousePosition { x, y })
        },
    }

}

fn get_position() -> Result<MousePosition, &'static str> {
    // 调用获取鼠标位置的函数
    match get_mouse_position() {
        Ok(position) => {
            // 获取到位置信息
            println!("x: {}, y: {}", position.x, position.y);
            Ok(position)
        }
        Err(_) => {
            // 获取位置失败
            println!("Error getting mouse position");
            Err("Error getting mouse position")
        }
    }
}

```