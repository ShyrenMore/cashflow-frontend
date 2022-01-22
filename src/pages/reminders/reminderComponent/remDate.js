export default function RemDate(props) {
  // console.log(props.remDate);
  const month = props.remDate.toLocaleString("en-US", { month: "long" }); //get month in word format
  const day = props.remDate.toLocaleString("en-US", { day: "2-digit" }); // get 2-digit date nos
  const year = props.remDate.getFullYear(); //get year eg. 2014
  return (
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
}
