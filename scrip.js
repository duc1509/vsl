/*

document.addEventListener("DOMContentLoaded", function () {
  const sentenceElement = document.getElementById("sentence");
  const wordsElement = document.getElementById("words");
  const boxxElement = document.querySelector(".boxx");
  const completeButton = document.getElementById("completeButton");
  const resetButton = document.getElementById("resetButton");

  let currentSentenceIndex = 0;
  let clickedWords = {};
  let sentences = [];  
  //let isLoggedIn = false; // biến kiểm tra trạng thái đăng nhập
//  let lastCompletedSentence = -1; // lưu câu đã hoàn thành cuối cùng
  fetch("http://localhost/get_questions.php")
    .then(response => response.json())
    .then(data => {
      sentences = data;
      displaySentence();
    })
    .catch(error => {
      console.error("Lỗi khi lấy dữ liệu từ cơ sở dữ liệu: " + error);
    });

  function displaySentence() {
    if (currentSentenceIndex >= sentences.length) {
      sentenceElement.textContent = "Chúc mừng! Bạn đã hoàn thành tất cả các câu. Cảm ơn bạn!";
    
      wordsElement.innerHTML = "";
      return;
    }
    const currentSentence = sentences[currentSentenceIndex];
    const originalSentence = "Câu " + currentSentenceIndex + ":" + currentSentence;
    sentenceElement.innerHTML = `<strong class="center-content">${originalSentence}</strong>`;

    wordsElement.innerHTML = "";
    currentSentence.split(" ").forEach(word => {
      const wordDiv = document.createElement("div");
      wordDiv.textContent = word;
      wordDiv.classList.add("word");
      wordsElement.appendChild(wordDiv);
    });

    
  }
  displaySentence();

  function showContentAfterLogin() {

    const loginContainer = document.querySelector(".login-container");
    const contentContainer = document.getElementById("content-container");
    loginContainer.style.display = "none";
    contentContainer.style.display = "block";

    
    // Tạo phần tử hình ảnh
    const imageContainer = document.getElementById("imageContainer");
    const image = document.createElement("img");
    image.src = "VNU-UET logo.png"; // Đường dẫn tới hình ảnh của bạn
    image.alt = "Hình ảnh mô tả";
    image.classList.add("image"); // Thêm lớp CSS nếu cần

    // Thêm hình ảnh vào phần tử chứa hình ảnh
    imageContainer.appendChild(image);


    displaySentence();
  }


// Gửi yêu cầu đến máy chủ PHP để lấy dữ liệu

const userCredentials = [];
fetch("http://localhost/login.php")
  .then(response => response.json())
  .then(data => {
    // Dữ liệu đã lấy được từ máy chủ
    // Tạo mảng 2 chiều để lưu thông tin username và mat_khau
    

    // Lặp qua dữ liệu từ máy chủ và thêm vào mảng 'userCredentials'
    for (let i = 0; i < data.length; i++) {
      const username = data[i].username;
      const mat_khau = data[i].mat_khau;
      userCredentials.push([username, mat_khau]);
    }

    // Bây giờ 'userCredentials' là một mảng 2 chiều chứa thông tin username và mat_khau của mỗi tài khoản
   // console.log(userCredentials);
  })
  .catch(error => {
    console.error("Lỗi khi lấy dữ liệu từ máy chủ:", error);
  });

  let isLoggedIn = false; // Khởi tạo biến kiểm tra trạng thái đăng nhập

  // Khi đăng nhập thành công
function handleLoginSuccess() {
  isLoggedIn = true; // Đặt biến isLoggedIn thành true
}
document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Tìm kiếm trong mảng userCredentials để kiểm tra đăng nhập
  const foundUser = userCredentials.find(user => user[0] === email && user[1] === password);

  if (foundUser) {
    const savedCurrentSentenceIndex = localStorage.getItem("currentSentenceIndex");
    if (savedCurrentSentenceIndex !== null) {
      if (!isLoggedIn) {
        currentSentenceIndex = 0; // Đặt lại currentSentenceIndex nếu chưa đăng nhập
      } else {
        currentSentenceIndex = parseInt(savedCurrentSentenceIndex);
      }
      alert("Bạn đang tiếp tục");
    } else {
      currentSentenceIndex = 0; // Giá trị mặc định nếu không có dữ liệu trong localStorage
    }

    showContentAfterLogin();
    handleLoginSuccess(); // Đánh dấu tài khoản đã đăng nhập
  } else {
    document.getElementById("login-status").textContent = "Sai email hoặc mật khẩu. Vui lòng thử lại!";
  }
});



  function saveCurrentSentenceIndex() {
    localStorage.setItem("currentSentenceIndex", currentSentenceIndex);
  }

// Mảng lưu kết quả các câu đã sắp xếp
const sortedResults = [];

completeButton.addEventListener("click", function () {
    const boxChildren = boxxElement.children;
    if (boxChildren.length === 0) {
        alert("Câu chưa được sắp xếp");
        return;
    }

    const sortedWords = [];
    for (let i = 0; i < boxChildren.length; i++) {
        sortedWords.push(boxChildren[i].textContent);
    }

    // Nội dung dạng chuỗi để in ra hoặc sử dụng tùy ý
    const sortedSentenceContent = sortedWords.join(" ");

    // Thêm kết quả câu đã sắp xếp vào mảng sortedResults
    sortedResults.push(sortedSentenceContent);

   // alert(sortedSentenceContent);

    boxxElement.innerHTML = "";
    clickedWords = {};
    saveCurrentSentenceIndex(); // Lưu trạng thái sau khi hoàn thành câu

    currentSentenceIndex++;

    if (currentSentenceIndex >= sentences.length) {
        sentenceElement.textContent = "Chúc mừng! Bạn đã hoàn thành tất cả các câu. Cảm ơn bạn!";
        wordsElement.innerHTML = "";
    } else {
        displaySentence();
    }
    
  });

  
 

  
  resetButton.addEventListener("click", function () {
    wordsElement.innerHTML = "";
    sentences[currentSentenceIndex].split(" ").forEach(word => {
      const wordDiv = document.createElement("div");
      wordDiv.textContent = word;
      wordDiv.classList.add("word");
      wordsElement.appendChild(wordDiv);
    });
    boxxElement.innerHTML = "";
    clickedWords = {};
  });

  boxxElement.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  boxxElement.addEventListener("drop", function (event) {
    event.preventDefault();
    const word = event.target;
    boxxElement.appendChild(word);
  });

  boxxElement.addEventListener("click", function (event) {
    if (event.target.classList.contains("word")) {
      const word = event.target;

      if (clickedWords[word.textContent]) {
        wordsElement.appendChild(word);
        clickedWords[word.textContent] = false;
      } else {
        const newWord = document.createElement("div");
        newWord.classList.add("word");
        newWord.textContent = word.textContent;
        wordsElement.appendChild(newWord);
        clickedWords[word.textContent] = true;
      }
    }
  });

  wordsElement.addEventListener("click", function (event) {
    if (event.target.classList.contains("word")) {
      const word = event.target;
      const box = document.createElement("div");
      box.classList.add("box_1");
      box.textContent = word.textContent;
      boxxElement.appendChild(box);
      wordsElement.removeChild(word);
    }
  });





// Thêm sự kiện cho nút "exit"
const exitButton = document.getElementById("exitButton");
exitButton.addEventListener("click", function () {

  const dang_xuat = window.confirm("Bạn muốn thoát khỏi trang web?");
        
  if (dang_xuat) {
      // Người dùng đã chọn "OK"
      // Thực hiện xử lý khi người dùng bỏ qua ở đây
      window.location.href = "http://127.0.0.1:5500/vls.html?";

      const fileName = "sorted_results.txt";
      const fileContent = sortedResults.join("\n");
      const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
      saveAs(blob, fileName);
      
  } else {
      // Người dùng đã chọn "Không"
      // Thực hiện xử lý khi người dùng không bỏ qua ở đây
      // Ví dụ: không thực hiện gì cả hoặc hiển thị thông báo khác
  }
    // Thực hiện các xử lý hoặc chuyển hướng khi người dùng thoát
    // Ví dụ: Chuyển hướng đến trang khác hoặc thực hiện xử lý thoát khác
    
});



// Lấy tham chiếu đến modal và nút "Bỏ qua"
const modal = document.getElementById("myModal");
const skipButton = document.getElementById("skipButton");

// Khi người dùng nhấp vào nút "Bỏ qua"
skipButton.addEventListener("click", function () {
  // Hiển thị hộp thoại xác nhận
  const result = window.confirm("Bạn muốn bỏ qua?");
        
  if (result) {
      // Người dùng đã chọn "OK"
      // Thực hiện xử lý khi người dùng bỏ qua ở đây
      currentSentenceIndex++;
      displaySentence();
  } else {
      // Người dùng đã chọn "Không"
      // Thực hiện xử lý khi người dùng không bỏ qua ở đây
      // Ví dụ: không thực hiện gì cả hoặc hiển thị thông báo khác
  }
});

// ... (các phần mã khác)



});

/*

document.addEventListener("DOMContentLoaded", function () {
  const sentenceElement = document.getElementById("sentence");
  const wordsElement = document.getElementById("words");
  const boxxElement = document.querySelector(".boxx");
  const completeButton = document.getElementById("completeButton");
  const resetButton = document.getElementById("resetButton");

  let currentSentenceIndex = 0;
  let clickedWords = {};
  let sentences = [];  
  //let isLoggedIn = false; // biến kiểm tra trạng thái đăng nhập
//  let lastCompletedSentence = -1; // lưu câu đã hoàn thành cuối cùng
  fetch("http://localhost/get_questions.php")
    .then(response => response.json())
    .then(data => {
      sentences = data;
      displaySentence();
    })
    .catch(error => {
      console.error("Lỗi khi lấy dữ liệu từ cơ sở dữ liệu: " + error);
    });

  function displaySentence() {
    if (currentSentenceIndex >= sentences.length) {
      sentenceElement.textContent = "Chúc mừng! Bạn đã hoàn thành tất cả các câu. Cảm ơn bạn!";
    
      wordsElement.innerHTML = "";
      return;
    }
    const currentSentence = sentences[currentSentenceIndex];
    const originalSentence = "Câu " + currentSentenceIndex + ":" + currentSentence;
    sentenceElement.innerHTML = `<strong class="center-content">${originalSentence}</strong>`;

    wordsElement.innerHTML = "";
    currentSentence.split(" ").forEach(word => {
      const wordDiv = document.createElement("div");
      wordDiv.textContent = word;
      wordDiv.classList.add("word");
      wordsElement.appendChild(wordDiv);
    });

    
  }
  displaySentence();

  function showContentAfterLogin() {

    const loginContainer = document.querySelector(".login-container");
    const contentContainer = document.getElementById("content-container");
    loginContainer.style.display = "none";
    contentContainer.style.display = "block";

    
    // Tạo phần tử hình ảnh
    const imageContainer = document.getElementById("imageContainer");
    const image = document.createElement("img");
    image.src = "VNU-UET logo.png"; // Đường dẫn tới hình ảnh của bạn
    image.alt = "Hình ảnh mô tả";
    image.classList.add("image"); // Thêm lớp CSS nếu cần

    // Thêm hình ảnh vào phần tử chứa hình ảnh
    imageContainer.appendChild(image);


    displaySentence();
  }


// Gửi yêu cầu đến máy chủ PHP để lấy dữ liệu

const userCredentials = [];
fetch("http://localhost/login.php")
  .then(response => response.json())
  .then(data => {
    // Dữ liệu đã lấy được từ máy chủ
    // Tạo mảng 2 chiều để lưu thông tin username và mat_khau
    

    // Lặp qua dữ liệu từ máy chủ và thêm vào mảng 'userCredentials'
    for (let i = 0; i < data.length; i++) {
      const username = data[i].username;
      const mat_khau = data[i].mat_khau;
      userCredentials.push([username, mat_khau]);
    }

    // Bây giờ 'userCredentials' là một mảng 2 chiều chứa thông tin username và mat_khau của mỗi tài khoản
   // console.log(userCredentials);
  })
  .catch(error => {
    console.error("Lỗi khi lấy dữ liệu từ máy chủ:", error);
  });

  let isLoggedIn = false; // Khởi tạo biến kiểm tra trạng thái đăng nhập

  // Khi đăng nhập thành công
function handleLoginSuccess() {
  isLoggedIn = true; // Đặt biến isLoggedIn thành true
}
document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Tìm kiếm trong mảng userCredentials để kiểm tra đăng nhập
  const foundUser = userCredentials.find(user => user[0] === email && user[1] === password);

  if (foundUser) {
    const savedCurrentSentenceIndex = localStorage.getItem("currentSentenceIndex");
    if (savedCurrentSentenceIndex !== null) {
      if (!isLoggedIn) {
        currentSentenceIndex = 0; // Đặt lại currentSentenceIndex nếu chưa đăng nhập
      } else {
        currentSentenceIndex = parseInt(savedCurrentSentenceIndex);
      }
      alert("Bạn đang tiếp tục");
    } else {
      currentSentenceIndex = 0; // Giá trị mặc định nếu không có dữ liệu trong localStorage
    }

    showContentAfterLogin();
    handleLoginSuccess(); // Đánh dấu tài khoản đã đăng nhập
  } else {
    document.getElementById("login-status").textContent = "Sai email hoặc mật khẩu. Vui lòng thử lại!";
  }
});



  function saveCurrentSentenceIndex() {
    localStorage.setItem("currentSentenceIndex", currentSentenceIndex);
  }

// Mảng lưu kết quả các câu đã sắp xếp
const sortedResults = [];

completeButton.addEventListener("click", function () {
    const boxChildren = boxxElement.children;
    if (boxChildren.length === 0) {
        alert("Câu chưa được sắp xếp");
        return;
    }

    const sortedWords = [];
    for (let i = 0; i < boxChildren.length; i++) {
        sortedWords.push(boxChildren[i].textContent);
    }

    // Nội dung dạng chuỗi để in ra hoặc sử dụng tùy ý
    const sortedSentenceContent = sortedWords.join(" ");

   // saveResultsToDatabase(email, sortedSentenceContent);

    // Thêm kết quả câu đã sắp xếp vào mảng sortedResults
    sortedResults.push(sortedSentenceContent);
// Tạo đối tượng dữ liệu để gửi lên máy chủ PHP
const data = new FormData();
data.append('email', email.value);
data.append('sortedSentenceContent', sortedSentenceContent);
data.append('sentence',currentSentenceIndex);


// Sử dụng Fetch API để gửi dữ liệu lên máy chủ PHP
fetch('http://localhost/save.php', {
  method: 'POST',
  body: data
})
  .then(response => response.text())
  .then(data => {
    // Xử lý kết quả trả về từ máy chủ PHP
    console.log(data);
    alert(data);
  })
  .catch(error => {
    console.error('Lỗi:', error);
  });

    boxxElement.innerHTML = "";
    clickedWords = {};
    saveCurrentSentenceIndex(); // Lưu trạng thái sau khi hoàn thành câu
    //saveResultsToDatabase(email, sortedSentenceContent);


    currentSentenceIndex++;

    if (currentSentenceIndex >= sentences.length) {
        sentenceElement.textContent = "Chúc mừng! Bạn đã hoàn thành tất cả các câu. Cảm ơn bạn!";
        wordsElement.innerHTML = "";
    } else {
        displaySentence();
    }
    
  });

  /*
  document.addEventListener("DOMContentLoaded", function () {
    const sentenceElement = document.getElementById("sentence");
    const wordsElement = document.getElementById("words");
    const boxxElement = document.querySelector(".boxx");
    const completeButton = document.getElementById("completeButton");
    const resetButton = document.getElementById("resetButton");
  
    let currentSentenceIndex = 0;
    
    // Lấy giá trị currentIndexSentence từ Local Storage
    const storedIndex = localStorage.getItem("currentSentenceIndex");
    if (storedIndex !== null) {
      currentSentenceIndex = parseInt(storedIndex);
    }
    let clickedWords = {};
    let sentences = [];  
    let userIndex = -1;
    const userCurrentSentenceIndex = {}; // Lưu trạng thái câu hiện tại của từng tài khoản
    fetch("http://localhost/get_questions.php")
      .then(response => response.json())
      .then(data => {
        sentences = data;
        displaySentence();
      })
      .catch(error => {
        console.error("Lỗi khi lấy dữ liệu từ cơ sở dữ liệu: " + error);
      });
  
    function displaySentence() {
      if (currentSentenceIndex >= sentences.length) {
        sentenceElement.textContent = "Chúc mừng! Bạn đã hoàn thành tất cả các câu. Cảm ơn bạn!";
      
        wordsElement.innerHTML = "";
        return;
      }
      const currentSentence = sentences[currentSentenceIndex];
      const originalSentence = "Câu " + currentSentenceIndex + ":" + currentSentence;
      sentenceElement.innerHTML = `<strong class="center-content">${originalSentence}</strong>`;
  
      wordsElement.innerHTML = "";
      currentSentence.split(" ").forEach(word => {
        const wordDiv = document.createElement("div");
        wordDiv.textContent = word;
        wordDiv.classList.add("word");
        wordsElement.appendChild(wordDiv);
      });
    }
    
    
    
     function showContentAfterLogin() {
      const loginContainer = document.querySelector(".login-container");
      const contentContainer = document.getElementById("content-container");
      loginContainer.style.display = "none";
      contentContainer.style.display = "block";
    
      const imageContainer = document.getElementById("imageContainer");
      const image = document.createElement("img");
      image.src = "VNU-UET logo.png";
      image.alt = "Hình ảnh mô tả";
      image.classList.add("image");
      imageContainer.appendChild(image);
    
      const storedUserIndex = localStorage.getItem("currentUserIndex");
      if (storedUserIndex !== null) {
        userIndex = parseInt(storedUserIndex);
        const storedSentenceIndex = localStorage.getItem(`currentSentenceIndex_${userIndex}`);
        if (storedSentenceIndex !== null) {
          currentSentenceIndex = parseInt(storedSentenceIndex);
        }
      }
    
      displaySentence(); // Đảm bảo rằng câu hiện tại được hiển thị đúng sau khi đăng nhập
    }
    
  
    // Gửi yêu cầu đến máy chủ PHP để lấy dữ liệu
    const userCredentials = [];
    fetch("http://localhost/login.php")
      .then(response => response.json())
      .then(data => {
        // Dữ liệu đã lấy được từ máy chủ
        // Tạo mảng 2 chiều để lưu thông tin username và mat_khau
  
        // Lặp qua dữ liệu từ máy chủ và thêm vào mảng 'userCredentials'
        for (let i = 0; i < data.length; i++) {
          const username = data[i].username;
          const mat_khau = data[i].mat_khau;
          userCredentials.push([username, mat_khau]);
        }
      })
      .catch(error => {
        console.error("Lỗi khi lấy dữ liệu từ máy chủ:", error);
      });
  
    let isLoggedIn = false; // Khởi tạo biến kiểm tra trạng thái đăng nhập
  
    // Khi đăng nhập thành công
   // ...
function handleLoginSuccess(email) {
  isLoggedIn = true;
  userIndex = userCredentials.findIndex(user => user[0] === email);

  // Lấy trạng thái câu hiện tại của tài khoản từ Local Storage (nếu có)
  const storedSentenceIndex = localStorage.getItem(`currentSentenceIndex_${userIndex}`);
  if (storedSentenceIndex !== null) {
    currentSentenceIndex = parseInt(storedSentenceIndex);
  } else {
    // Sử dụng giá trị mặc định nếu không có trạng thái câu hiện tại trong Local Storage
    currentSentenceIndex = 0;
  }

  localStorage.setItem(`currentSentenceIndex_user${userIndex}`, currentSentenceIndex);

}
  
    document.getElementById("login-form").addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      // Tìm kiếm trong mảng userCredentials để kiểm tra đăng nhập
      const foundUser = userCredentials.find(user => user[0] === email && user[1] === password);
  
      if (foundUser) {
        handleLoginSuccess(email);
        showContentAfterLogin(email);
      //  localStorage.setItem("currentSentenceIndex", currentSentenceIndex); // Lưu trạng thái câu hiện tại vào Local Storage
      localStorage.setItem(`currentSentenceIndex_user${userIndex}`, currentSentenceIndex);

      } else {
        document.getElementById("login-status").textContent = "Sai email hoặc mật khẩu. Vui lòng thử lại!";
      }
    });
    function saveCurrentSentenceIndex() {
    //  localStorage.setItem("currentSentenceIndex", currentSentenceIndex);
    localStorage.setItem(`currentSentenceIndex_user${userIndex}`, currentSentenceIndex);
    }
  
  // Mảng lưu kết quả các câu đã sắp xếp
  const sortedResults = [];
  
completeButton.addEventListener("click", function () {
  const boxChildren = boxxElement.children;
  if (boxChildren.length === 0) {
      alert("Câu chưa được sắp xếp");
      return;
  }

  const sortedWords = [];
  for (let i = 0; i < boxChildren.length; i++) {
      sortedWords.push(boxChildren[i].textContent);
  }

  // Nội dung dạng chuỗi để in ra hoặc sử dụng tùy ý
  const sortedSentenceContent = sortedWords.join(" ");

 // saveResultsToDatabase(email, sortedSentenceContent);

  // Thêm kết quả câu đã sắp xếp vào mảng sortedResults
  sortedResults.push(sortedSentenceContent);
// Tạo đối tượng dữ liệu để gửi lên máy chủ PHP
const data = new FormData();
data.append('email', email.value);
data.append('sortedSentenceContent', sortedSentenceContent);
data.append('sentence',currentSentenceIndex);


// Sử dụng Fetch API để gửi dữ liệu lên máy chủ PHP
fetch('http://localhost/save.php', {
method: 'POST',
body: data
})
.then(response => response.text())
.then(data => {
  // Xử lý kết quả trả về từ máy chủ PHP
  console.log(data);
  alert(data);
})
.catch(error => {
  console.error('Lỗi:', error);
});

  boxxElement.innerHTML = "";
  clickedWords = {};
  saveCurrentSentenceIndex(); // Lưu trạng thái sau khi hoàn thành câu
  //saveResultsToDatabase(email, sortedSentenceContent);


  currentSentenceIndex++;

  if (currentSentenceIndex >= sentences.length) {
      sentenceElement.textContent = "Chúc mừng! Bạn đã hoàn thành tất cả các câu. Cảm ơn bạn!";
      wordsElement.innerHTML = "";
  } else {
      displaySentence();
  }
  
});
resetButton.addEventListener("click", function () {
  wordsElement.innerHTML = "";
  sentences[currentSentenceIndex].split(" ").forEach(word => {
    const wordDiv = document.createElement("div");
    wordDiv.textContent = word;
    wordDiv.classList.add("word");
    wordsElement.appendChild(wordDiv);
  });
  boxxElement.innerHTML = "";
  clickedWords = {};
});

boxxElement.addEventListener("dragover", function (event) {
  event.preventDefault();
});

boxxElement.addEventListener("drop", function (event) {
  event.preventDefault();
  const word = event.target;
  boxxElement.appendChild(word);
});

boxxElement.addEventListener("click", function (event) {
  if (event.target.classList.contains("word")) {
    const word = event.target;

    if (clickedWords[word.textContent]) {
      wordsElement.appendChild(word);
      clickedWords[word.textContent] = false;
    } else {
      const newWord = document.createElement("div");
      newWord.classList.add("word");
      newWord.textContent = word.textContent;
      wordsElement.appendChild(newWord);
      clickedWords[word.textContent] = true;
    }
  }
});

wordsElement.addEventListener("click", function (event) {
  if (event.target.classList.contains("word")) {
    const word = event.target;
    const box = document.createElement("div");
    box.classList.add("box_1");
    box.textContent = word.textContent;
    boxxElement.appendChild(box);
    wordsElement.removeChild(word);
  }
});



// Thêm sự kiện cho nút "Thoát"
const exitButton = document.getElementById("exitButton");
exitButton.addEventListener("click", async function () {
const dang_xuat = window.confirm("Bạn muốn thoát khỏi trang web?");
if (dang_xuat) {

  window.location.href = "http://127.0.0.1:5500/vls.html?";
}
});
  })
  */


/*
  document.addEventListener("DOMContentLoaded", function () {
    const sentenceElement = document.getElementById("sentence");
    const wordsElement = document.getElementById("words");
    const boxxElement = document.querySelector(".boxx");
    const completeButton = document.getElementById("completeButton");
    const resetButton = document.getElementById("resetButton");
  
    let currentSentenceIndex = 0;
    
    // Lấy giá trị currentIndexSentence từ Local Storage
    const storedIndex = localStorage.getItem("currentSentenceIndex");
    if (storedIndex !== null) {
      currentSentenceIndex = parseInt(storedIndex);
    }
    let clickedWords = {};
    let sentences = [];  
    let userIndex = -1;
    const userCurrentSentenceIndex = {}; // Lưu trạng thái câu hiện tại của từng tài khoản
    fetch("http://localhost/get_questions.php")
      .then(response => response.json())
      .then(data => {
        sentences = data;
        displaySentence();
      })
      .catch(error => {
        console.error("Lỗi khi lấy dữ liệu từ cơ sở dữ liệu: " + error);
      });
  
    function displaySentence() {
      if (currentSentenceIndex >= sentences.length) {
        sentenceElement.textContent = "Chúc mừng! Bạn đã hoàn thành tất cả các câu. Cảm ơn bạn!";
      
        wordsElement.innerHTML = "";
        return;
      }
      const currentSentence = sentences[currentSentenceIndex];
      const originalSentence = "Câu " + currentSentenceIndex + ":" + currentSentence;
      sentenceElement.innerHTML = `<strong class="center-content">${originalSentence}</strong>`;
  
      wordsElement.innerHTML = "";
      currentSentence.split(" ").forEach(word => {
        const wordDiv = document.createElement("div");
        wordDiv.textContent = word;
        wordDiv.classList.add("word");
        wordsElement.appendChild(wordDiv);
      });
    }
     function showContentAfterLogin() {
      const loginContainer = document.querySelector(".login-container");
      const contentContainer = document.getElementById("content-container");
      loginContainer.style.display = "none";
      contentContainer.style.display = "block";
    
      const imageContainer = document.getElementById("imageContainer");
      const image = document.createElement("img");
      image.src = "VNU-UET logo.png";
      image.alt = "Hình ảnh mô tả";
      image.classList.add("image");
      imageContainer.appendChild(image);
    
      const storedUserIndex = localStorage.getItem("currentUserIndex");
      if (storedUserIndex !== null) {
        userIndex = parseInt(storedUserIndex);
        const storedSentenceIndex = localStorage.getItem(`currentSentenceIndex_${email}`);
        if (storedSentenceIndex !== null) {
          currentSentenceIndex = parseInt(storedSentenceIndex);
        }
      }
    
      displaySentence(); // Đảm bảo rằng câu hiện tại được hiển thị đúng sau khi đăng nhập
    }
    
  
    // Gửi yêu cầu đến máy chủ PHP để lấy dữ liệu
    const userCredentials = [];
    fetch("http://localhost/login.php")
      .then(response => response.json())
      .then(data => {
        // Dữ liệu đã lấy được từ máy chủ
        // Tạo mảng 2 chiều để lưu thông tin username và mat_khau
  
        // Lặp qua dữ liệu từ máy chủ và thêm vào mảng 'userCredentials'
        for (let i = 0; i < data.length; i++) {
          const username = data[i].username;
          const mat_khau = data[i].mat_khau;
          userCredentials.push([username, mat_khau]);
        }
      })
      .catch(error => {
        console.error("Lỗi khi lấy dữ liệu từ máy chủ:", error);
      });
  
    let isLoggedIn = false; // Khởi tạo biến kiểm tra trạng thái đăng nhập
  
    // Khi đăng nhập thành công
    function handleLoginSuccess(email) {

      isLoggedIn = true;
  userIndex = userCredentials.findIndex(user => user[0] === email);

  // Lấy trạng thái câu hiện tại của tài khoản từ Local Storage (nếu có)
  const storedSentenceIndex = localStorage.getItem(`currentSentenceIndex_${userIndex}`);
  if (storedSentenceIndex !== null) {
    currentSentenceIndex = parseInt(storedSentenceIndex);
  } else {
    // Sử dụng giá trị mặc định nếu không có trạng thái câu hiện tại trong Local Storage
    currentSentenceIndex = 0;
  }
  displaySentence(); // Đảm bảo rằng câu hiện tại được hiển thị đúng sau khi đăng nhập
    }
  
    document.getElementById("login-form").addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      // Tìm kiếm trong mảng userCredentials để kiểm tra đăng nhập
      const foundUser = userCredentials.find(user => user[0] === email && user[1] === password);
  
      if (foundUser) {
        handleLoginSuccess(email);
        showContentAfterLogin();
        localStorage.setItem("currentSentenceIndex", currentSentenceIndex); // Lưu trạng thái câu hiện tại vào Local Storage
        localStorage.setItem(`currentSentenceIndex_${email}`, currentSentenceIndex);
      } else {
        document.getElementById("login-status").textContent = "Sai email hoặc mật khẩu. Vui lòng thử lại!";
      }
    });
    function saveCurrentSentenceIndex() {
     // localStorage.setItem("currentSentenceIndex", currentSentenceIndex);
     localStorage.setItem(`currentSentenceIndex_${email}`, currentSentenceIndex);
    
    }
  
  // Mảng lưu kết quả các câu đã sắp xếp
  const sortedResults = [];
  
completeButton.addEventListener("click", function () {
  const boxChildren = boxxElement.children;
  if (boxChildren.length === 0) {
      alert("Câu chưa được sắp xếp");
      return;
  }

  const sortedWords = [];
  for (let i = 0; i < boxChildren.length; i++) {
      sortedWords.push(boxChildren[i].textContent);
  }

  // Nội dung dạng chuỗi để in ra hoặc sử dụng tùy ý
  const sortedSentenceContent = sortedWords.join(" ");

 // saveResultsToDatabase(email, sortedSentenceContent);

  // Thêm kết quả câu đã sắp xếp vào mảng sortedResults
  sortedResults.push(sortedSentenceContent);
// Tạo đối tượng dữ liệu để gửi lên máy chủ PHP
const data = new FormData();
data.append('email', email.value);
data.append('sortedSentenceContent', sortedSentenceContent);
data.append('sentence',currentSentenceIndex);


// Sử dụng Fetch API để gửi dữ liệu lên máy chủ PHP
fetch('http://localhost/save.php', {
method: 'POST',
body: data
})
.then(response => response.text())
.then(data => {
  // Xử lý kết quả trả về từ máy chủ PHP
  console.log(data);
  alert(data);
})
.catch(error => {
  console.error('Lỗi:', error);
});

  boxxElement.innerHTML = "";
  clickedWords = {};
  saveCurrentSentenceIndex(); // Lưu trạng thái sau khi hoàn thành câu
  //saveResultsToDatabase(email, sortedSentenceContent);


  currentSentenceIndex++;

  if (currentSentenceIndex >= sentences.length) {
      sentenceElement.textContent = "Chúc mừng! Bạn đã hoàn thành tất cả các câu. Cảm ơn bạn!";
      wordsElement.innerHTML = "";
  } else {
      displaySentence();
  }
  
});
resetButton.addEventListener("click", function () {
  wordsElement.innerHTML = "";
  sentences[currentSentenceIndex].split(" ").forEach(word => {
    const wordDiv = document.createElement("div");
    wordDiv.textContent = word;
    wordDiv.classList.add("word");
    wordsElement.appendChild(wordDiv);
  });
  boxxElement.innerHTML = "";
  clickedWords = {};
});

boxxElement.addEventListener("dragover", function (event) {
  event.preventDefault();
});

boxxElement.addEventListener("drop", function (event) {
  event.preventDefault();
  const word = event.target;
  boxxElement.appendChild(word);
});

boxxElement.addEventListener("click", function (event) {
  if (event.target.classList.contains("word")) {
    const word = event.target;

    if (clickedWords[word.textContent]) {
      wordsElement.appendChild(word);
      clickedWords[word.textContent] = false;
    } else {
      const newWord = document.createElement("div");
      newWord.classList.add("word");
      newWord.textContent = word.textContent;
      wordsElement.appendChild(newWord);
      clickedWords[word.textContent] = true;
    }
  }
});

wordsElement.addEventListener("click", function (event) {
  if (event.target.classList.contains("word")) {
    const word = event.target;
    const box = document.createElement("div");
    box.classList.add("box_1");
    box.textContent = word.textContent;
    boxxElement.appendChild(box);
    wordsElement.removeChild(word);
  }
});



// Thêm sự kiện cho nút "Thoát"
const exitButton = document.getElementById("exitButton");
exitButton.addEventListener("click", async function () {
const dang_xuat = window.confirm("Bạn muốn thoát khỏi trang web?");
if (dang_xuat) {
   // Lưu trạng thái câu hiện tại vào Local Storage khi thoát
   localStorage.setItem(`currentSentenceIndex_${email}`, currentSentenceIndex);


  window.location.href = "http://127.0.0.1:5500/vls.html?";
}

// Khi đăng nhập lại, đảm bảo hiển thị câu tiếp theo hoặc bắt đầu từ câu đầu tiên
if (isLoggedIn) {
  showContentAfterLogin();
} else {
  // Nếu chưa đăng nhập, đặt currentSentenceIndex thành 0 và hiển thị câu đầu tiên
  currentSentenceIndex = 0;
  displaySentence();
}
});







// Lấy tham chiếu đến modal và nút "Bỏ qua"
const modal = document.getElementById("myModal");
const skipButton = document.getElementById("skipButton");

// Khi người dùng nhấp vào nút "Bỏ qua"
skipButton.addEventListener("click", function () {
// Hiển thị hộp thoại xác nhận
const result = window.confirm("Bạn muốn bỏ qua?");
      
if (result) {
    // Người dùng đã chọn "OK"
    // Thực hiện xử lý khi người dùng bỏ qua ở đây
    currentSentenceIndex++;
    displaySentence();
} else {
    // Người dùng đã chọn "Không"
    // Thực hiện xử lý khi người dùng không bỏ qua ở đây
    // Ví dụ: không thực hiện gì cả hoặc hiển thị thông báo khác
}
});

// ... (các phần mã khác)



})
*/
document.addEventListener("DOMContentLoaded", function () {
  const sentenceElement = document.getElementById("sentence");
  const wordsElement = document.getElementById("words");
  const boxxElement = document.querySelector(".boxx");
  const completeButton = document.getElementById("completeButton");
  const resetButton = document.getElementById("resetButton");

  let currentSentenceIndex = 0;
  
  // Lấy giá trị currentIndexSentence từ Local Storage
  const storedIndex = localStorage.getItem("currentSentenceIndex");
  if (storedIndex !== null) {
    currentSentenceIndex = parseInt(storedIndex);
  }
  let clickedWords = {};
  let sentences = [];
  let userIndex = -1;

  fetch("http://localhost/get_questions.php")
    .then((response) => response.json())
    .then((data) => {
      sentences = data;
      displaySentence();
    })
    .catch((error) => {
      console.error("Lỗi khi lấy dữ liệu từ cơ sở dữ liệu: " + error);
    });

  function displaySentence() {
    if (currentSentenceIndex >= sentences.length) {
      sentenceElement.textContent =
        "Chúc mừng! Bạn đã hoàn thành tất cả các câu. Cảm ơn bạn!";

      wordsElement.innerHTML = "";
      return;
    }
    const currentSentence = sentences[currentSentenceIndex];
    const originalSentence =
      "Câu " + currentSentenceIndex + ":" + currentSentence;
    sentenceElement.innerHTML = `<strong class="center-content">${originalSentence}</strong>`;

    wordsElement.innerHTML = "";
    currentSentence.split(" ").forEach((word) => {
      const wordDiv = document.createElement("div");
      wordDiv.textContent = word;
      wordDiv.classList.add("word");
      wordsElement.appendChild(wordDiv);



    });

  }

  function showContentAfterLogin(email) {
    const loginContainer = document.querySelector(".login-container");
    const contentContainer = document.getElementById("content-container");
    loginContainer.style.display = "none";
    contentContainer.style.display = "block";

    const imageContainer = document.getElementById("imageContainer");
    const image = document.createElement("img");
    image.src = "VNU-UET logo.png";
    image.alt = "Hình ảnh mô tả";
    image.classList.add("image");
    imageContainer.appendChild(image);

    const storedSentenceIndex = localStorage.getItem(
      `currentSentenceIndex_${email}`
    );
    if (storedSentenceIndex !== null) {
      currentSentenceIndex = parseInt(storedSentenceIndex);
    }

    displaySentence();
  }

  const userCredentials = [];

  fetch("http://localhost/login.php")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const username = data[i].username;
        const mat_khau = data[i].mat_khau;
        userCredentials.push([username, mat_khau]);
      }
    })
    .catch((error) => {
      console.error("Lỗi khi lấy dữ liệu từ máy chủ:", error);
    });

  let isLoggedIn = false;

  function handleLoginSuccess(email) {
    isLoggedIn = true;
    userIndex = userCredentials.findIndex((user) => user[0] === email);

    const storedSentenceIndex = localStorage.getItem(
      `currentSentenceIndex_${email}`
    );
    if (storedSentenceIndex !== null) {
      currentSentenceIndex = parseInt(storedSentenceIndex);
    } else {
      currentSentenceIndex = 0;
    }
    displaySentence();
  }

  document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const foundUser = userCredentials.find(
      (user) => user[0] === email && user[1] === password
    );

    if (foundUser) {
      handleLoginSuccess(email);
      alert("Bạn đang tiếp tục");
      showContentAfterLogin(email);
      localStorage.setItem("currentSentenceIndex", currentSentenceIndex);
      localStorage.setItem(`currentSentenceIndex_${email}`, currentSentenceIndex);
    } else {
      document.getElementById("login-status").textContent =
        "Sai email hoặc mật khẩu. Vui lòng thử lại!";
    }
  });

  function saveCurrentSentenceIndex(email) {
    localStorage.setItem(`currentSentenceIndex_${email}`, currentSentenceIndex);
  }

  const sortedResults = [];

  completeButton.addEventListener("click", function () {
    const boxChildren = boxxElement.children;
    if (boxChildren.length === 0) {
      alert("Câu chưa được sắp xếp");
      return;
    }

    const sortedWords = [];
    for (let i = 0; i < boxChildren.length; i++) {
      sortedWords.push(boxChildren[i].textContent);
    }

    const sortedSentenceContent = sortedWords.join(" ");

    sortedResults.push(sortedSentenceContent);

    const email = document.getElementById("email").value; // Lấy email của người dùng đăng nhập

    const data = new FormData();
    data.append("email", email);
    data.append("sortedSentenceContent", sortedSentenceContent);
    data.append("sentence", currentSentenceIndex);

    fetch("http://localhost/save.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        alert(data);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });

    boxxElement.innerHTML = "";
    clickedWords = {};
    saveCurrentSentenceIndex(email);

    currentSentenceIndex++;

    if (currentSentenceIndex >= sentences.length) {
      sentenceElement.textContent =
        "Chúc mừng! Bạn đã hoàn thành tất cả các câu. Cảm ơn bạn!";
      wordsElement.innerHTML = "";
    } else {
      displaySentence();
    }
  });

  boxxElement.addEventListener("click", function (event) {
    if (event.target.classList.contains("wordDiv")) {
      const word = event.target;
  
      // Xóa từ khỏi boxxElement khi được click
      boxxElement.removeChild(word);
      wordsElement.appendChild(word);
    }
  });

resetButton.addEventListener("click", function () {
  wordsElement.innerHTML = "";
  sentences[currentSentenceIndex].split(" ").forEach((word) => {
    const wordDiv = document.createElement("div");
    wordDiv.textContent = word;
    wordDiv.classList.add("word");
    wordsElement.appendChild(wordDiv);
  });
  
  // Lấy danh sách các từ trong boxxElement
  const wordsInBox = Array.from(boxxElement.querySelectorAll(".word"));
  
  // Đặt lại thuộc tính dữ liệu để đưa từ trở lại vị trí ban đầu
  wordsInBox.forEach((word) => {
    const originalIndex = word.getAttribute("data-original-index");
    if (originalIndex !== null) {
      wordsElement.insertBefore(word, wordsElement.children[originalIndex]);
      word.removeAttribute("data-original-index");
    }
  });
  
  boxxElement.innerHTML = "";
  clickedWords = {};
});

// ...

boxxElement.addEventListener("dragover", function (event) {
  event.preventDefault();
});

boxxElement.addEventListener("drop", function (event) {
  event.preventDefault();
  const word = event.target;
  boxxElement.appendChild(word);
});

boxxElement.addEventListener("click", function (event) {
  if (event.target.classList.contains("word")) {
    const word = event.target;

    if (clickedWords[word.textContent]) {
      wordsElement.appendChild(word);
      clickedWords[word.textContent] = false;
    }
      else {
        const newWord = document.createElement("div");
        newWord.classList.add("word");
        newWord.textContent = word.textContent;
        wordsElement.appendChild(newWord);
        clickedWords[word.textContent] = true;
      }
    }
  });
  
  wordsElement.addEventListener("click", function (event) {
    if (event.target.classList.contains("word")) {
      const word = event.target;
      const box = document.createElement("div");
      box.classList.add("box_1");
      box.textContent = word.textContent;
      boxxElement.appendChild(box);
      wordsElement.removeChild(word);
    }
  });
  
  boxxElement.addEventListener("click", function (event) {
    if (event.target.classList.contains("box_1")) {
      const box_1 = event.target;
      const word = document.createElement("div");
      word.classList.add("word");
      word.textContent = box_1.textContent;
      wordsElement.appendChild(word);
      boxxElement.removeChild(box_1);
    }
  });
  
    const exitButton = document.getElementById("exitButton");
    exitButton.addEventListener("click", async function () {
      const dang_xuat = window.confirm("Bạn muốn thoát khỏi trang web?");
      if (dang_xuat) {
        const email = document.getElementById("email").value; // Lấy email của người dùng đăng nhập
        localStorage.setItem(`currentSentenceIndex_${email}`, currentSentenceIndex);
  
        window.location.href = "http://127.0.0.1:5500/vls.html?";
      }
  
      if (isLoggedIn) {
        showContentAfterLogin(email);
      } else {
        currentSentenceIndex = 0;
        displaySentence();
      }
    });
  
    const modal = document.getElementById("myModal");
    const skipButton = document.getElementById("skipButton");
  
    skipButton.addEventListener("click", function () {
      const result = window.confirm("Bạn muốn bỏ qua?");
  
      if (result) {
        currentSentenceIndex++;
        displaySentence();
      } else {
        // Xử lý khi người dùng không bỏ qua
      }
    });
  
    // ... (phần mã khác)
  });