import axios from "axios";
import { useEffect, useState } from "react";
import { getUserID } from "zmp-sdk/apis";

const HomePage = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hàm lấy UserID từ Zalo SDK
  const fetchUserId = async () => {
    try {
      const id = await getUserID();  
      console.log("UserID:", id);
      setUserId(id);  
      setLoading(false);  
    } catch (error) {
      console.error("Lỗi khi lấy UserID:", error);
      setLoading(false);  
    }
  };

  const sendZns = async () => {
    if (!userId) {
      alert("UserID chưa được lấy.");
      return;
    }

    const accessToken = "4MHpNxOYubKJO75QioFbKHXWT5cxE-8qP7ycVgTjiov2UKjbYq-DBcrYR4YpUVeoUKaVVjvvzYbzU3bJlblG9bSU6q6pMDXBT5en48niftzLLLOkj1MYP54tQ3oMUernQtfBVuzicpHkKWzcl63e3squVbIzUPSkVcj6U9nFqJTYR08zkqpFLNn3AL-B1zvPQ3Oi5wmjt55P2nG_h1A4McSg2poX6irkM1Oe7xihirXC5oXGjLN7Fqz8I5Qn2wzVIp1eKOq4fY9e6LLGrZQoFXGDTJJNBUTCBWilDSqgo49cBomJj3YZG4ONKqcI3yDEPXi5HPyUz4rr314OeG7_P6KP9JJ7Nkn_Cd8tSEzimou8ApTPwn-bEG8aKchd4g4JH4ffJfDgaaLKLaC8fa3KH0PlCJYWIT5qSPDreZ-sF-LG";  
    const url = "https://openapi.zalo.me/v2.0/oa/message";
    const data = {
      "recipient": {
        "user_id": userId,
      },
      "message": {
        "text": "Hồ Minh Nhựt đã gửi tin nhắn cho bạn", 
      },
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`, 
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      

      if (response.data.error_code === 0) {
        alert("Thông báo đã được gửi thành công!");
      } else {
        alert(`Lỗi khi gửi ZNS: ${response.data.error_message}`);
      }
    } catch (error) {
      console.log(error);      
      alert("Lỗi khi gửi thông báo.");
    }
  };

  useEffect(() => {
    fetchUserId();  
  }, []);  

  return (
    <div className="container mt-2">
      {loading ? (
        <p>Đang tải UserID...</p>
      ) : (
        <span className="text-danger d-block">UserID: {JSON.stringify(userId)}</span>
      )}
      <button className="btn btn-dark" onClick={sendZns}>
        Gửi ZNS
      </button>
    </div>
  );
};

export default HomePage;
