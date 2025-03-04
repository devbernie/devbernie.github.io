<template>
  <div class="container" ref="resultContainer">
    <div class="card">
      <div class="header">
        <h1>Kết quả bài kiểm tra</h1>
      </div>
      
      <div class="result-section">
        <h2>Thông tin cá nhân</h2>
        <p><strong>Họ và tên:</strong> {{ personalInfo.fullName }}</p>
        <p><strong>Mã sinh viên:</strong> {{ personalInfo.studentId }}</p>
        <p><strong>Lớp:</strong> {{ personalInfo.className }}</p>
        <p><strong>Khóa:</strong> {{ personalInfo.course }}</p>
      </div>
      
      <div class="result-section">
        <h2>Nguyên tố chủ đạo của bạn</h2>
        <div v-for="element in dominantElements" :key="element" class="element-description">
          <p><span class="element-name">{{ element }}:</span> {{ elementDescriptions[element] }}</p>
        </div>
      </div>
      
      <div class="text-center">
        <button class="btn" @click="saveScreenshot">Lưu ảnh màn hình</button>
        <button class="btn btn-secondary" @click="restartTest" style="margin-left: 1rem;">Làm lại bài kiểm tra</button>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import { elementDescriptions } from '../data/questions.js';

export default {
  name: 'Results',
  data() {
    return {
      personalInfo: {},
      testResults: null,
      elementDescriptions: elementDescriptions,
      dominantElements: []
    }
  },
  methods: {
    saveScreenshot() {
      html2canvas(this.$refs.resultContainer).then(canvas => {
        const link = document.createElement('a');
        link.download = `elemental-test-result-${this.personalInfo.fullName}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    },
    restartTest() {
      // Xóa kết quả bài test, giữ lại thông tin cá nhân
      localStorage.removeItem('testResults');
      this.$router.push('/test');
    },
    findDominantElements() {
      if (!this.testResults || !this.testResults.elementScores) return [];
      
      const scores = this.testResults.elementScores;
      const elements = Object.keys(scores);
      
      // Tìm điểm cao nhất
      const maxScore = Math.max(...elements.map(element => scores[element]));
      
      // Lọc ra các nguyên tố có điểm cao nhất
      return elements.filter(element => scores[element] === maxScore);
    }
  },
  created() {
    // Lấy thông tin cá nhân từ localStorage
    const personalInfoStr = localStorage.getItem('personalInfo');
    if (personalInfoStr) {
      this.personalInfo = JSON.parse(personalInfoStr);
    } else {
      this.$router.push('/personal-info');
      return;
    }
    
    // Lấy kết quả bài test từ localStorage
    const testResultsStr = localStorage.getItem('testResults');
    if (testResultsStr) {
      this.testResults = JSON.parse(testResultsStr);
      this.dominantElements = this.findDominantElements();
    } else {
      this.$router.push('/test');
      return;
    }
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>