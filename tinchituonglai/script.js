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
