<template>
  <div class="container">
    <div class="card">
      <div class="header">
        <h1>Elemental Personality Test</h1>
        <p>
          Chào mừng bạn đến với bài kiểm tra tính cách dựa trên các nguyên tố. 
          Bài kiểm tra này sẽ giúp bạn khám phá những đặc điểm tính cách nổi bật 
          của mình thông qua việc phân tích các lựa chọn của bạn.
        </p>
        <p class="mt-4">
          Bài kiểm tra bao gồm 10 câu hỏi, mỗi câu có 5 đáp án. Với mỗi đáp án, 
          bạn sẽ chọn đáp án "Phù hợp nhất" và "Không phù hợp nhất" với bản thân.
        </p>
        <p class="mt-4">
          Thời gian làm bài là 15 phút. Hãy chuẩn bị sẵn sàng và trả lời một cách 
          trung thực nhất để có kết quả chính xác.
        </p>
      </div>
      <div class="text-center">
        <router-link to="/personal-info" class="btn">Bắt đầu</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome'
}
</script>

<style scoped>
.mt-4 {
  margin-top: 1rem;
}
.text-center {
  text-align: center;
}
</style>