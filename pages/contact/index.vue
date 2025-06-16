<template>
  <section class="max-w-3xl mx-auto px-4 py-12 mt-10 lg:mt-16">
    <div class="text-center mb-10">
      <h1 class="text-2xl lg:text-4xl font-bold text-gray-800 mb-3">Liên Hệ Với Chúng Tôi</h1>
      <p class="text-gray-600">
        Có điều gì muốn chia sẻ, góp ý hoặc đơn giản là gửi lời chào? Cứ thoải mái nhé!
      </p>
    </div>

    <form @submit.prevent="submitForm" class="bg-white p-8 rounded-2xl shadow-lg space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Tên của bạn"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="you@example.com"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
        <textarea
          v-model="form.content"
          rows="5"
          placeholder="Viết lời nhắn của bạn..."
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main"
        ></textarea>
      </div>

      <div class="text-center">
        <button
          type="submit"
          class="bg-main hover:bg-texthover text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-200"
        >
          Gửi Tin Nhắn
        </button>
      </div>
    </form>

    <div class="text-center mt-10 text-sm text-gray-500">
      <p>📬 Email: <a href="mailto:dailychillblog@gmail.com" class="underline">dailychillblog@gmail.com</a></p>
      <p class="mt-2">💖 Cảm ơn bạn đã ghé thăm!</p>
    </div>
  </section>
</template>

<script>
const DOMAIN = process.env.DOMAIN_API ?? "http://103.159.51.131:3001/";
export default {
  name: 'ContactPage',
  layout: 'Main',
  data() {
    return {
      form: {
        name: '',
        email: '',
        content: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        const res = await fetch(`${DOMAIN}mail/send-mail`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        alert("🎉 Gửi mail thành công, cảm ơn bạn!");
        this.form = { name: '', email: '', content: '' }; // Reset form
      } catch (err) {
        alert("❌ Gửi mail thất bại: " + err.message);
      }
    }
  },
  head() {
    return {
      title: 'Liên Hệ - Blog Chữa Lành & Truyện Cười',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Liên hệ với chúng tôi để góp ý, chia sẻ hoặc gửi lời chào.'
        }
      ]
    };
  }
}
</script>
