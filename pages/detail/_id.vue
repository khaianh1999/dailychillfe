<template>
    <div class="min-h-screen bg-gray-50 pt-16 lg:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <img
          :src="getUrlImage(dataRender?.image_url)"
          alt="Outdoor cooking hacks"
          class="w-full h-64 object-cover"
        />
  
        <div class="p-6 sm:p-8">
          <!-- Title -->
          <h1 class="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
            {{ dataRender?.title }}
          </h1>
  
          <!-- Meta -->
          <div class="text-sm text-gray-500 mb-6 flex flex-wrap gap-2">
            <span>By <strong class="text-gray-700">{{dataRender?.full_name ?? 'Admin'}}</strong></span>
            <span>•</span>
            <span>{{ new Date(dataRender?.created_at).toLocaleString() }}</span>
            <span>•</span>
            <span>{{ fakeView() }}👍</span>
          </div>
  
          <!-- Content -->
          <div class="text-gray-700 leading-relaxed space-y-4" v-html="dataRender?.content">
            
          </div>
  
          <!-- Back link -->
          <div class="mt-10">
            <nuxt-link
              to="/"
              class="inline-block bg-main hover:bg-hover text-white font-semibold py-2 px-4 rounded transition"
            >
              ← Về trang chủ
            </nuxt-link>
          </div>

            <!-- Bình luận -->
            <div class="pt-10">
                <comment-form @add-comment="addComment" />
                <comment-list :comments="comments" />
            </div>
        </div>
      </div>
    <!-- Toast/Notification System -->
    <div v-if="toast.show" class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white"
         :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'">
      {{ toast.message }}
    </div>
    </div>
</template>
  
<script>
import CommentForm from '~/components/CommentForm.vue'
import CommentList from '~/components/CommentList.vue'
const DOMAIN = process.env.DOMAIN_API ?? "https://api.dailychill.vn/";
import main from "~/mixins/main";
export default {
    layout: 'Main',
    mixins: [main],
    head() {
      const title = this.dataRender?.title || 'Chi tiết bài viết - DailyChill';
      const description = this.dataRender?.description || this.stripHTML(this.dataRender?.content || '').slice(0, 160);
      const image = this.getUrlImage(this.dataRender?.image_url || '/imgSeo.jpg');
      const url = `https://dailychill.vn/detail/${this.$route.params.id}`;

      return {
        title,
        meta: [
          { hid: 'description', name: 'description', content: description },
          { hid: 'keywords', name: 'keywords', content: 'blog chữa lành, phát triển bản thân, cảm hứng sống, thiền định, DailyChill' },
          { hid: 'author', name: 'author', content: this.dataRender?.full_name || 'DailyChill Team' },

          // Open Graph (Facebook, Zalo)
          { hid: 'og:title', property: 'og:title', content: title },
          { hid: 'og:description', property: 'og:description', content: description },
          { hid: 'og:image', property: 'og:image', content: image },
          { hid: 'og:url', property: 'og:url', content: url },
          { hid: 'og:type', property: 'og:type', content: 'article' },

          // Twitter Card
          { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
          { hid: 'twitter:title', name: 'twitter:title', content: title },
          { hid: 'twitter:description', name: 'twitter:description', content: description },
          { hid: 'twitter:image', name: 'twitter:image', content: image }
        ]
      }
    },
    components: {
        CommentForm,
        CommentList,
    },
    async fetch() {
        await this.getDetailArticle();
    },
    data() {
        return {
            comments: [],
            dataRender: null,
            idDetail: null,
            toast: { // Hệ thống thông báo toast
              show: false,
              message: '',
              type: '', // 'success' or 'error'
            },
        }
    },
    methods: {
        stripHTML(html) {
          if (!html) return '';
          return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        },
        addComment(comment) {
          console.log('comment', comment);
            this.comments.unshift(comment) // thêm vào đầu danh sách
        },
        async getDetailArticle() {
            try {
                this.idDetail = this.$route.params.id;
                const response = await this.$axios.$get('/articles/api/'+this.idDetail); // Thay đổi endpoint nếu cần
                this.dataRender = response.data;
                this.comments = this.dataRender.comments ?? [];
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết bài viết:', error);
                this.showToast('Lỗi khi tải bài viết!', 'error');
            }
        },
        showToast(message, type) {
          this.toast.message = message;
          this.toast.type = type;
          this.toast.show = true;
          setTimeout(() => {
            this.toast.show = false;
          }, 3000); // Tự động ẩn sau 3 giây
        },
        getUrlImage(img) {
        // nếu là ảnh có https thì lấy luôn, không thì thêm DOMAIN vào 
        if (img && img?.includes('https')) {
          return img;
        }
        return DOMAIN + img;
      },
    },
}
</script>
  