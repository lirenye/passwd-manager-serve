function LocalTime():number {
  const date = new Date();
  return (date.getTime() + 28800000);
};


export default LocalTime;