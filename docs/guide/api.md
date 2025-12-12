# API 调用

NapLink 提供了完整的 OneBot 11 API 支持。所有 API 方法都是异步的，返回 Promise。推荐使用 `client.api.*` 统一入口（例如 `client.api.setGroupBan()`），同时保留向后兼容的直接方法（如 `client.setGroupBan()`）。

## 基本用法

```typescript
// 调用 API
const result = await client.sendGroupMessage('123456', '你好');
console.log('消息ID:', result.message_id);
```

## 账号相关

### getLoginInfo()

获取登录号信息。

```typescript
const info = await client.getLoginInfo();
console.log(info);
// { user_id: 12345, nickname: 'Bot' }
```

### getStatus()

获取运行状态。

```typescript
const status = await client.getStatus();
console.log(status);
// { online: true, good: true }
```

## 消息发送

### sendMessage()

发送消息（通用）。

```typescript
await client.sendMessage({
  message_type: 'group',  // 或 'private'
  group_id: '123456',
  message: '你好',
});
```

### sendPrivateMessage()

发送私聊消息。

```typescript
await client.sendPrivateMessage('user_id', '私聊消息');

// 发送复杂消息
await client.sendPrivateMessage('user_id', [
  { type: 'text', data: { text: '你好！' } },
  { type: 'face', data: { id: '123' } },
]);
```

### sendGroupMessage()

发送群消息。

```typescript
await client.sendGroupMessage('group_id', '群消息');

// 发送 @ 消息
await client.sendGroupMessage('group_id', [
  { type: 'at', data: { qq: 'user_id' } },
  { type: 'text', data: { text: ' 你好' } },
]);
```

### sendGroupForwardMessage()

发送合并转发消息。

```typescript
await client.sendGroupForwardMessage('group_id', [
  {
    type: 'node',
    data: {
      name: '发送者1',
      uin: '10001',
      content: '消息内容1',
    },
  },
  {
    type: 'node',
    data: {
      name: '发送者2',
      uin: '10002',
      content: '消息内容2',
    },
  },
]);
```

## 消息管理

### getMessage()

获取消息详情。

```typescript
const msg = await client.getMessage('message_id');
console.log(msg);
```

### deleteMessage()

撤回消息。

```typescript
await client.deleteMessage('message_id');
```

### markMessageAsRead()

标记消息已读。

```typescript
await client.markMessageAsRead('message_id');
```

### setEssenceMessage() / deleteEssenceMessage()

设置/移除精华消息。

```typescript
await client.setEssenceMessage('message_id');
await client.deleteEssenceMessage('message_id');
```

### getEssenceMessageList()

获取群精华消息列表。

```typescript
const list = await client.getEssenceMessageList('group_id');
```

### getForwardMessage()

获取合并转发消息内容。

```typescript
const messages = await client.getForwardMessage('forward_id');
console.log(messages);
```

## 群组管理

### getGroupList()

获取群列表。

```typescript
const groups = await client.getGroupList();
for (const group of groups) {
  console.log(`${group.group_name} (${group.group_id})`);
}
```

### getGroupInfo()

获取群信息。

```typescript
const info = await client.getGroupInfo('group_id');
console.log(info);

// 不使用缓存
const freshInfo = await client.getGroupInfo('group_id', true);
```

### getGroupMemberList()

获取群成员列表。

```typescript
const members = await client.getGroupMemberList('group_id');
console.log(`群成员数: ${members.length}`);
```

### getGroupMemberInfo() / getGroupMemberList()

获取群成员信息。

```typescript
const member = await client.getGroupMemberInfo('group_id', 'user_id');
console.log(`昵称: ${member.nickname}`);
console.log(`权限: ${member.role}`);  // owner/admin/member
```

### setGroupBan() / setGroupWholeBan()

禁言成员或全员禁言，默认禁言 30 分钟。

```typescript
await client.setGroupBan('group_id', 'user_id', 10 * 60);
await client.setGroupWholeBan('group_id', false);
```

### setGroupAdmin() / setGroupCard() / setGroupName() / setGroupSpecialTitle()

```typescript
await client.setGroupAdmin('group_id', 'user_id', true);
await client.setGroupCard('group_id', 'user_id', 'NapLink Bot');
await client.setGroupName('group_id', '新群名');
await client.setGroupSpecialTitle('group_id', 'user_id', '活跃成员', 3600); // 默认 -1 永久
```

### setGroupKick() / setGroupLeave() / setGroupAnonymousBan()

```typescript
await client.setGroupKick('group_id', 'user_id', true);
await client.setGroupLeave('group_id', false);
await client.setGroupAnonymousBan('group_id', 'anonymous_flag', 30 * 60);
```

### unsetGroupBan()

取消成员禁言。

```typescript
await client.unsetGroupBan('group_id', 'user_id');
```

### setGroupPortrait()

设置群头像（上传文件/Buffer/流）。

```typescript
await client.setGroupPortrait('group_id', '/tmp/avatar.jpg');
```

### getGroupAtAllRemain()

查询群 @全体 剩余次数。

```typescript
const remain = await client.getGroupAtAllRemain('group_id');
```

### getGroupSystemMsg()

获取群系统消息（如入群申请列表）。

```typescript
const sysMsg = await client.getGroupSystemMsg();
```

### getGroupHonorInfo()

获取群荣誉信息。

```typescript
const honor = await client.getGroupHonorInfo('group_id', 'talkative'); // all | talkative | performer | legend | strong_newbie | emotion
```

### setEssenceMessage() / deleteEssenceMessage()

参见“消息管理”章节。

## 好友管理

### getFriendList()

获取好友列表。

```typescript
const friends = await client.getFriendList();
for (const friend of friends) {
  console.log(`${friend.nickname} (${friend.user_id})`);
}
```

### sendLike()

点赞（默认 1 次）。

```typescript
await client.sendLike('user_id', 5);
```

### getStrangerInfo()

```typescript
const stranger = await client.getStrangerInfo('user_id', true);
```

## 文件操作

### getImage()

获取图片信息。

```typescript
const image = await client.getImage('file_id');
console.log(image.file);  // 图片文件路径
console.log(image.url);   // 图片URL
```

### getRecord()

获取语音文件。

```typescript
const record = await client.getRecord('file_id');

// 指定输出格式
const mp3 = await client.getRecord('file_id', 'mp3');
```

### getFile()

获取文件信息。

```typescript
const file = await client.getFile('file_id');
console.log(file.file);  // 文件路径
console.log(file.url);   // 文件URL
```

### uploadGroupFile() / uploadPrivateFile()

上传文件到群或私聊，支持本地路径、`Buffer`/`Uint8Array` 或可读流。

```typescript
// 本地路径
await client.uploadGroupFile('group_id', '/tmp/demo.txt', 'demo.txt');

// Buffer
await client.uploadPrivateFile('user_id', Buffer.from('hello'), 'hello.txt');
```

### uploadFileStream() / getUploadStreamStatus()

NapCat Stream API 分片上传，支持断点续传。

```typescript
// 分片上传（默认 chunkSize 256KB）
await client.uploadFileStream('/tmp/large.bin', {
  streamId: 'custom-id',   // 可选，自定义流ID，便于续传
  chunkSize: 512 * 1024,   // 可选，默认 256KB
  fileRetention: 30_000,   // 可选，分片保留时间（毫秒，NapCat 支持时生效）
  verifyOnly: false,       // 可选，true 时仅校验分片，不写入
  reset: true,             // 可选，先重置已有流状态
});

// 查询流状态（便于续传缺失分片）
const status = await client.getUploadStreamStatus('custom-id');
// status.data.missing_chunks 可用于补发

// 根据缺失分片自动补发示例
const missing = status?.data?.missing_chunks as number[] | undefined;
if (missing && missing.length) {
  const chunkSize = 512 * 1024;
  const filePath = '/tmp/large.bin';
  const buf = await fs.promises.readFile(filePath); // 简单示例，可换成流式读取
  for (const idx of missing) {
    const start = idx * chunkSize;
    const end = Math.min(start + chunkSize, buf.length);
    const chunk = buf.slice(start, end);
    await client.callApi('upload_file_stream', {
      stream_id: 'custom-id',
      chunk_data: chunk.toString('base64'),
      chunk_index: idx,
      total_chunks: Math.ceil(buf.length / chunkSize),
      file_size: buf.length,
      filename: 'large.bin',
      verify_only: false,
    });
  }
  await client.callApi('upload_file_stream', { stream_id: 'custom-id', is_complete: true });
}
```

## 自定义 API

### callApi()

调用任意 API。

```typescript
const result = await client.callApi('custom_action', {
  param1: 'value1',
  param2: 'value2',
});
```

## 版本/资料

```typescript
const version = await client.getVersionInfo();
const stranger = await client.getStrangerInfo('user_id', true);
```

## 错误处理

所有 API 方法都可能抛出错误：

```typescript
import { ApiError, ApiTimeoutError } from 'naplink';

try {
  await client.sendGroupMessage('group_id', 'Hello');
} catch (error) {
  if (error instanceof ApiTimeoutError) {
    console.error('API 调用超时');
  } else if (error instanceof ApiError) {
    console.error(`API 错误 (${error.details.retcode})`);
  }
}
```

## 超时和重试

你可以为单次 API 调用设置不同的超时和重试：

```typescript
// 默认使用全局配置
await client.sendGroupMessage('group_id', 'Hello');

// 自定义超时（需要扩展实现）
// 当前版本使用全局配置
```

## 批量操作

处理多个群：

```typescript
const groups = await client.getGroupList();

// 并行发送
await Promise.all(
  groups.map(group =>
    client.sendGroupMessage(group.group_id, '公告')
  )
);

// 串行发送（避免频繁）
for (const group of groups) {
  await client.sendGroupMessage(group.group_id, '公告');
  await new Promise(resolve => setTimeout(resolve, 1000)); // 延迟1秒
}
```

## 下一步

- [事件处理](/guide/events) - 监听和处理事件
- [错误处理](/guide/errors) - 正确处理错误
- [OneBot API 参考](/api/onebot) - 完整 API 文档
