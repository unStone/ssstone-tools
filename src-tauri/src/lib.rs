// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_updater::UpdaterExt;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .setup(|app| {
            let app_handle = app.handle().clone();

            tauri::async_runtime::spawn(async move {
                let updater = match app_handle.updater_builder().build() {
                    Ok(updater) => updater,
                    Err(error) => {
                        eprintln!("[updater] build updater failed: {error}");
                        return;
                    }
                };

                let update = match updater.check().await {
                    Ok(update) => update,
                    Err(error) => {
                        eprintln!("[updater] check update failed: {error}");
                        return;
                    }
                };

                if let Some(update) = update {
                    if let Err(error) = update.download_and_install(|_, _| {}, || {}).await {
                        eprintln!("[updater] download/install update failed: {error}");
                        return;
                    }

                    if let Err(error) = app_handle.restart() {
                        eprintln!("[updater] restart failed: {error}");
                    }
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
