let currentIndex = 0;
const slideInterval = 3000;

function slideTeam() {
    const teamSlide = document.querySelector('.team-slide');
    currentIndex = (currentIndex + 1) % 5;
    teamSlide.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(slideTeam, slideInterval);

document.getElementById('contactForm').addEventListener('submit', function(event) {
    // Lấy các giá trị từ các trường
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Định dạng regex cho email và số điện thoại
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(032|033|034|035|036|037|038|039|081|082|083|084|085|070|079|077|076|078|056|058|086|096|097|098|088|091|094|089|090|093|092|099|059)\d{7}$/;

    // Kiểm tra định dạng email
    if (!emailRegex.test(email)) {
        alert("Email không đúng định dạng! Vui lòng nhập lại.");
        event.preventDefault();
        return;
    }

    // Kiểm tra định dạng số điện thoại (nếu người dùng đã nhập)
    if (phone && !phoneRegex.test(phone)) {
        alert("Số điện thoại không đúng định dạng! Vui lòng nhập lại.");
        event.preventDefault();
        return;
    }

    alert("Thông tin hợp lệ. Đang gửi...");
});

// Hiển thị nút khi cuộn xuống 100px
window.onscroll = function() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Hàm cuộn lên đầu trang
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Cuộn mượt
    });
}

//new part
document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    function showSlide(index) {
        const slider = document.querySelector('.slider');
        // Đặt vị trí của slider sao cho hiển thị slide theo index
        slider.style.transform = `translateX(-${index * (100 / totalSlides)}%)`;
        // Cập nhật các chấm tròn để chỉ có chấm hiện tại là "active"
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function moveToSlide(index) {
        showSlide(index);
    }

    function autoSlide() {
        currentIndex = (currentIndex + 1) % totalSlides; // Di chuyển tới slide kế tiếp, quay lại đầu nếu là slide cuối
        showSlide(currentIndex);
    }

    // Gán sự kiện click cho từng chấm tròn
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => moveToSlide(index));
    });

    // Hiển thị slide đầu tiên khi tải trang
    showSlide(currentIndex);

    // Chạy tự động mỗi 5 giây
    setInterval(autoSlide, 5000);
});
