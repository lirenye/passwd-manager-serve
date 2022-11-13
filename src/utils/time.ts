function LocalTime():number {
  const date = new Date();
  return (date.getTime() + 28800000);
};

export function FormatLog(type: ('ERROR' | 'INFO'), username: string, msg: string):void{
  const localTime = LocalTime();
  const nowTime = new Date(localTime);
  console.log(`[${nowTime.toLocaleString()}] ${type} (${username}): ${msg}`);
}

export default LocalTime;