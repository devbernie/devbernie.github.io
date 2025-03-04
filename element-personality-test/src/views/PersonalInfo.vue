<template>
  <div class="container">
    <div class="card">
      <div class="header">
        <h1>Thông tin cá nhân</h1>
        <p>Vui lòng điền đầy đủ thông tin cá nhân của bạn trước khi bắt đầu bài kiểm tra.</p>
      </div>
      
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="fullName">Họ và tên</label>
          <input 
            type="text" 
            id="fullName" 
            v-model="personalInfo.fullName" 
            required
          />
          <div v-if="errors.fullName" class="error-message">{{ errors.fullName }}</div>
        </div>
        
        <div class="form-group">
          <label for="studentId">Mã sinh viên</label>
          <input 
            type="text" 
            id="studentId" 
            v-model="personalInfo.studentId" 
            required
          />
          <div v-if="errors.studentId" class="error-message">{{ errors.studentId }}</div>
        </div>
        
        <div class="form-group">
          <label for="className">Lớp</label>
          <input 
            type="text" 
            id="className" 
            v-model="personalInfo.className" 
            required
          />
          <div v-if="errors.className" class="error-message">{{ errors.className }}</div>
        </div>
        
        <div class="form-group">
          <label for="course">Khóa</label>
          <input 
            type="text" 
            id="course" 
            v-model="personalInfo.course" 
            required
          />
          <div v-if="errors.course" class="error-message">{{ errors.course }}</div>
        </div>
        
        <div class="text-center">
          <button type="submit" class="btn">Tiếp tục</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalInfo',
  data() {
    return {
      personalInfo: {
        fullName: '',
        studentId: '',
        className: '',
        course: ''
      },
      errors: {
        fullName: '',
        studentId: '',
        className: '',
        course: ''
      }
    }
  },
  methods: {
    validateForm() {
      let isValid = true;
      this.errors = {
        fullName: '',
        studentId: '',
        className: '',
        course: ''
      };
      
      if (!this.personalInfo.fullName.trim()) {
        this.errors.fullName = 'Vui lòng nhập họ và tên';
        isValid = false;
      }
      
      if (!this.personalInfo.studentId.trim()) {
        this.errors.studentId = 'Vui lòng nhập mã sinh viên';
        isValid = false;
      }
      
      if (!this.personalInfo.className.trim()) {
        this.errors.className = 'Vui lòng nhập lớp';
        isValid = false;
      }
      
      if (!this.personalInfo.course.trim()) {
        this.errors.course = 'Vui lòng nhập khóa';
        isValid = false;
      }
      
      return isValid;
    },
    submitForm() {
      if (this.validateForm()) {
        localStorage.setItem('personalInfo', JSON.stringify(this.personalInfo));
        this.$router.push('/test');
      }
    }
  },
  created() {
    // Kiểm tra nếu đã có thông tin cá nhân trong localStorage
    const savedInfo = localStorage.getItem('personalInfo');
    if (savedInfo) {
      this.personalInfo = JSON.parse(savedInfo);
    }
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>