const fs = require('fs');

// Kiểm tra xem file tồn tại hay chưa
fs.access('sorted_results.txt', (err) => {
  if (err) {
    // File không tồn tại, tạo file và ghi dữ liệu vào nó
    fs.writeFile('sorted_results.txt', 'Dữ liệu mẫu', (err) => {
      if (err) throw err;
      console.log('Đã tạo file "sorted_results.txt"');
    });
  } else {
    console.log('File "sorted_results.txt" đã tồn tại');
  }
});
