<template>
  <footer class="bg-gray-100 border-t border-gray-200 mt-16">
    <div class="max-w-screen-xl mx-auto px-4 py-3">
      <div class="py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-gray-700">
        <!-- Cột 1: Giới thiệu -->
        <div>
          <h2 class="text-lg font-semibold text-gray-900 mb-4">🌿 Blog Chữa Lành</h2>
          <p>
            Góc nhỏ của những tiếng cười, những câu chuyện đời thường và hành trình chữa lành. Cảm ơn bạn đã ghé thăm!
          </p>
        </div>

        <!-- Cột 2: Liên kết nhanh -->
        <div>
          <h2 class="text-lg font-semibold text-gray-900 mb-4">📚 Chuyên mục</h2>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/category/bai-viet" class="hover:text-indigo-600">Bài viết</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/category/joke" class="hover:text-indigo-600">Truyện cười</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/category/fanfic" class="hover:text-indigo-600">Fanfic</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/category/review" class="hover:text-indigo-600">Review sách</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="hover:text-indigo-600">Về tôi</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="hover:text-indigo-600">Liên hệ</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Cột 3: Liên hệ & mạng xã hội -->
        <div>
          <h2 class="text-lg font-semibold text-gray-900 mb-4">📬 Kết nối</h2>
          <ul class="space-y-2">
            <li>Email: <a href="mailto:dailychillblog@gmail.com"
                class="text-indigo-600 hover:underline">dailychillblog@gmail.com</a></li>
            <li>Facebook: <a href="https://www.facebook.com/dailychillblog/" class="hover:text-indigo-600">https://www.facebook.com/dailychillblog/</a></li>
            <li>Instagram: <a href="#" class="hover:text-indigo-600">@DailyChill</a></li>
          </ul>
        </div>
      </div>

      <div class="text-center py-6 text-xs text-gray-500 border-t border-gray-200">
        © {{ new Date().getFullYear() }} DailyChill. All rights reserved.
      </div>
    </div>

  </footer>
</template>

<script>
export default {}
</script>
