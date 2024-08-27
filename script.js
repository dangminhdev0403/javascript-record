
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      const recognition = new SpeechRecognition();
      recognition.interimResults = true;
      recognition.continuous = true; // Đảm bảo ghi âm liên tục

      let p = document.createElement('p');
      const records = document.querySelector('.records');
      records.appendChild(p);

      let inactivityTimeout;

      const startRecognition = () => {
        recognition.start();
        console.log('Đã bắt đầu ghi âm');
        
        // Thiết lập thời gian chờ để tự động dừng ghi âm nếu không có âm thanh trong 10 giây
        inactivityTimeout = setTimeout(() => {
          recognition.stop();
          console.log('Đã dừng ghi âm do không có âm thanh');
        }, 10000); // 10000 ms = 10 giây
      };

      const stopRecognition = () => {
        recognition.stop();
        console.log('Đã dừng ghi âm');
        
        // Xóa thời gian chờ khi dừng ghi âm thủ công
        clearTimeout(inactivityTimeout);
      };

      recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        p.textContent = transcript;

        if (e.results[0].isFinal) {
          p = document.createElement('p');
          records.appendChild(p);
        }

        // Xóa thời gian chờ khi có kết quả
        clearTimeout(inactivityTimeout);

        // Thiết lập lại thời gian chờ để tự động dừng ghi âm nếu không có âm thanh trong 10 giây
        inactivityTimeout = setTimeout(() => {
          recognition.stop();
          console.log('Đã dừng ghi âm do không có âm thanh');
        }, 5000); // 10000 ms = 10 giây
      });

      recognition.addEventListener('end', () => {
        console.log('Ghi âm kết thúc');
        // Nếu cần, có thể tự động bắt đầu lại ghi âm
        // recognition.start();
      });

      // Bắt đầu ghi âm khi nhấn nút Bắt đầu ghi âm
      const startButton = document.getElementById('startRecordButton');
      startButton.addEventListener('click', startRecognition);

      // Xử lý khi nhấn nút Tắt ghi âm
      const stopButton = document.getElementById('stopRecordButton');
      stopButton.addEventListener('click', stopRecognition);
