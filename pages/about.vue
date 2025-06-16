<template>
    <section class="container mx-auto px-4 py-12 mt-16">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Về Chúng Tôi</h1>
        <p class="text-lg text-gray-600 mb-8">
          Nơi chia sẻ những nụ cười, những suy ngẫm về cuộc sống và hành trình chữa lành tâm hồn.
        </p>
      </div>
  
      <div class="space-y-8">
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <h2 class="text-2xl font-semibold text-indigo-600 mb-2">🌱 Sứ mệnh</h2>
          <p class="text-gray-700">
            Trong thế giới bận rộn, chúng tôi muốn tạo nên một góc nhỏ bình yên — nơi bạn có thể cười thật sảng khoái, đọc vài dòng đời thường và cảm nhận sự chữa lành từ những điều giản dị.
          </p>
        </div>
  
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <h2 class="text-2xl font-semibold text-pink-600 mb-2">😂 Truyện Cười</h2>
          <p class="text-gray-700">
            Cuộc sống cần tiếng cười. Những câu chuyện vui nhộn, hài hước sẽ giúp bạn thấy nhẹ lòng hơn sau một ngày dài mệt mỏi.
          </p>
        </div>
  
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <h2 class="text-2xl font-semibold text-green-600 mb-2">💬 Đời Sống & Chữa Lành</h2>
          <p class="text-gray-700">
            Chúng tôi chia sẻ những mẩu chuyện đời, những bài học nhỏ mà sâu sắc, để ai đó đang chênh vênh ngoài kia cảm thấy được đồng cảm và vững vàng hơn.
          </p>
        </div>
  
        <div class="text-center mt-10">
          <p class="text-gray-500 italic">
            "Một nụ cười bằng mười thang thuốc bổ — và chúng tôi ở đây để tặng bạn cả... trăm nụ cười!"
          </p>
        </div>
      </div>
      <Youtube/>
    </section>
  </template>
  
  <script>
  import Youtube from "../components/Youtube.vue";
  export default {
    name: 'AboutPage',
    layout: 'Main',
    components: {
      Youtube,
    },
    head() {
      return {
        title: 'Về Chúng Tôi - Blog Chữa Lành & Truyện Cười',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Tìm hiểu về blog chia sẻ truyện cười, đời sống và hành trình chữa lành tâm hồn.'
          }
        ]
      }
    }
  }
  </script>
  