# 更新日志

## v0.0.2

`v0.0.2` 重点补齐了 NapCat 的 `stream-action` 能力，并将 NapCatQQ 服务端的 action 做到“全量可调用”，同时补充了系统/扩展类 API，降低业务侧 `callApi()`/兼容分支的数量。

- GitHub Release：<https://github.com/NapLink/NapLink/releases/tag/v0.0.2>
- Tag：`v0.0.2`

### 主要更新

#### 1) stream-action：流式上传/下载

- `uploadFileStream()` / `getUploadStreamStatus()`
- `downloadFileStream()` / `downloadFileStreamToFile()`
- `downloadFileImageStream()` / `downloadFileImageStreamToFile()`
- `downloadFileRecordStream()` / `downloadFileRecordStreamToFile()`
- `cleanStreamTempFile()`

#### 2) P0–P2 常用能力封装

- 已读/历史：`markGroupMsgAsRead()` / `markPrivateMsgAsRead()` / `markAllMsgAsRead()`、`getGroupMsgHistory()` / `getFriendMsgHistory()`
- 戳一戳：`sendGroupPoke()` / `sendFriendPoke()` / `sendPoke()`
- 系统/能力探测：`getOnlineClients()`、`canSendImage()` / `canSendRecord()`、`getCookies()` / `getCsrfToken()` / `getCredentials()`、`setInputStatus()`、`ocrImage()` / `translateEn2zh()` / `checkUrlSafely()`
- 媒体补全：`hydrateMedia()` 兼容 `file_id -> file`

#### 3) 全量 action 直通

新增 `client.api.raw[...]`（以及 `client.raw[...]`）用于直通调用服务端 action（包含带 `.` 前缀的 action）：

```ts
await client.api.raw['get_group_shut_list']({ group_id: 123 });
await client.api.raw['.ocr_image']({ image: 'file:///tmp/a.png' });
```

## v0.0.1

首个公开版本：连接管理、OneBot 事件、常用 API、基础流式上传等。

- GitHub Release：<https://github.com/NapLink/NapLink/releases/tag/v0.0.1>
- Tag：`v0.0.1`

