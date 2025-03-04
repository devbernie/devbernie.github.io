<template>
  <div class="container">
    <div class="timer" v-if="timeLeft > 0">
      Thời gian còn lại: {{ formatTime(timeLeft) }}
    </div>
    
    <div class="progress-bar">
      <div class="progress-bar-fill" :style="{ width: `${(currentQuestionIndex / questions.length) * 100}%` }"></div>
    </div>
    
    <div class="card question-card" v-if="currentQuestion">
      <div class="question-title">
        <strong>Câu {{ currentQuestion.id }}/{{ questions.length }}:</strong> {{ currentQuestion.text }}
      </div>
      
      <div v-if="warning" class="warning">
        {{ warning }}
      </div>
      
      <div 
        v-for="option in currentQuestion.options" 
        :key="option.id" 
        class="answer-option"
        :class="{
          'selected-most': selectedMost === option.id,
          'selected-least': selectedLeast === option.id
        }"
      >
        <div class="answer-text">{{ option.text }}</div>
        <div class="answer-buttons">
          <button 
            class="btn" 
            :class="{ 'btn-secondary': selectedMost !== option.id }"
            @click="selectOption(option.id, 'most')"
          >
            Phù hợp nhất
          </button>
          <button 
            class="btn" 
            :class="{ 'btn-secondary': selectedLeast !== option.id }"
            @click="selectOption(option.id, 'least')"
          >
            Không phù hợp nhất
          </button>
        </div>
      </div>
      
      <div class="navigation">
        <button 
          v-if="currentQuestionIndex > 0" 
          class="btn btn-secondary" 
          @click="previousQuestion"
        >
          Câu trước
        </button>
        <div></div>
        <button 
          class="btn" 
          @click="nextQuestion"
          :disabled="!selectedMost || !selectedLeast"
        >
          {{ currentQuestionIndex === questions.length - 1 ? 'Hoàn thành' : 'Câu tiếp theo' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { questions } from '../data/questions.js';

export default {
  name: 'Test',
  data() {
    return {
      questions: questions,
      currentQuestionIndex: 0,
      answers: {},
      timeLeft: 15 * 60, // 15 phút tính bằng giây
      timer: null,
      warning: '',
      selectedMost: null,
      selectedLeast: null
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
  },
  methods: {
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    },
    selectOption(optionId, type) {
      if (type === 'most') {
        if (this.selectedLeast === optionId) {
          this.warning = 'Không thể chọn cùng một đáp án là "Phù hợp nhất" và "Không phù hợp nhất"!';
          return;
        }
        this.selectedMost = optionId;
      } else if (type === 'least') {
        if (this.selectedMost === optionId) {
          this.warning = 'Không thể chọn cùng một đáp án là "Phù hợp nhất" và "Không phù hợp nhất"!';
          return;
        }
        this.selectedLeast = optionId;
      }
      
      this.warning = '';
      
      // Lưu câu trả lời
      if (!this.answers[this.currentQuestion.id]) {
        this.answers[this.currentQuestion.id] = {};
      }
      this.answers[this.currentQuestion.id][type] = optionId;
    },
    nextQuestion() {
      if (!this.selectedMost || !this.selectedLeast) {
        this.warning = 'Vui lòng chọn cả "Phù hợp nhất" và "Không phù hợp nhất" trước khi tiếp tục!';
        return;
      }
      
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.loadCurrentQuestionAnswers();
      } else {
        this.finishTest();
      }
    },
    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
        this.loadCurrentQuestionAnswers();
      }
    },
    loadCurrentQuestionAnswers() {
      this.warning = '';
      this.selectedMost = null;
      this.selectedLeast = null;
      
      const questionId = this.currentQuestion.id;
      if (this.answers[questionId]) {
        this.selectedMost = this.answers[questionId].most;
        this.selectedLeast = this.answers[questionId].least;
      }
    },
    finishTest() {
      // Tính toán điểm số cho từng nguyên tố
      const elementScores = this.calculateElementScores();
      
      // Lưu kết quả vào localStorage
      localStorage.setItem('testResults', JSON.stringify({
        answers: this.answers,
        elementScores: elementScores,
        completedAt: new Date().toISOString()
      }));
      
      // Chuyển đến trang kết quả
      this.$router.push('/results');
    },
    calculateElementScores() {
      const elementScores = {
        "Carbon": 0,
        "Silicon": 0,
        "Oxygen": 0,
        "Neon": 0,
        "Gold": 0,
        "Iron": 0,
        "Flo": 0,
        "Caesi": 0,
        "Iridi": 0,
        "Natri": 0
      };
      
      // Duyệt qua từng câu trả lời
      Object.keys(this.answers).forEach(questionId => {
        const answer = this.answers[questionId];
        const question = this.questions.find(q => q.id === parseInt(questionId));
        
        if (question) {
          // Tìm đáp án được chọn là "Phù hợp nhất"
          if (answer.most) {
            const mostOption = question.options.find(opt => opt.id === answer.most);
            if (mostOption) {
              mostOption.elements.forEach(element => {
                elementScores[element] += 1;
              });
            }
          }
          
          // Tìm đáp án được chọn là "Không phù hợp nhất"
          if (answer.least) {
            const leastOption = question.options.find(opt => opt.id === answer.least);
            if (leastOption) {
              leastOption.elements.forEach(element => {
                elementScores[element] -= 1;
              });
            }
          }
        }
      });
      
      return elementScores;
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.timer);
          this.finishTest();
        }
      }, 1000);
    }
  },
  created() {
    // Kiểm tra xem người dùng đã nhập thông tin cá nhân chưa
    const personalInfo = localStorage.getItem('personalInfo');
    if (!personalInfo) {
      this.$router.push('/personal-info');
      return;
    }
    
    this.startTimer();
    this.loadCurrentQuestionAnswers();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  }
}
</script>