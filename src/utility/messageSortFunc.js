const msf = (a, b) => {
  const aLatestMsg = a.messages[a.messages.length - 1];
  const bLatestMsg = b.messages[b.messages.length - 1];
  if (!aLatestMsg) return 1;
  if (!bLatestMsg) return -1;
  return bLatestMsg.createdAt - aLatestMsg.createdAt;
};

export default msf;
