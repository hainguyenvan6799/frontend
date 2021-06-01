import axios from "axios";
import React from "react";
import { channel } from "./Store";

function Test2() {
  // React.useEffect(() => {
  //   channel.bind("client-add_files", function (data) {
  //     alert("Tao đang ở kênh event");
  //     alert(JSON.stringify(data));
  //   });
  // });
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    console.log("tooi ddang thuc hien laij nhieu lan");
    channel.bind("App\\Events\\MyEvent", function (data) {
      const a = JSON.parse(JSON.stringify(data));
      setData(a.data);
    });
    return () => {};
  }, []);
  console.log(data);
  const handleClick = async () => {
    const response = await axios.get("http://127.0.0.1:8000/testEvent");
  };
  return (
    <div>
      <h2>Ở đây chúng tôi chả cần gì</h2>
      <button onClick={handleClick}>click</button>
    </div>
  );
}

export default Test2;
