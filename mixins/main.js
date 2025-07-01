const DOMAIN = process.env.DOMAIN_API ?? "https://api.dailychill.vn/";
export default {
    data() {
      return {};
    },
  
    methods: {
      convertMoney(amount) {
        if (typeof amount !== "number") {
          throw new Error("Input must be a number");
        }
        return amount
          .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
          .replace("₫", "đ");
      },
  
      // ✅ Lấy giá trị cookie theo tên
      getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
      },
  
      // ✅ Thiết lập cookie
      setCookie(name, value, days = 30) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = `expires=${date.toUTCString()}`;
        
        // 👉 Encode & stringify nếu là object
        const encodedValue = encodeURIComponent(
          typeof value === 'object' ? JSON.stringify(value) : value
        );
      
        document.cookie = `${name}=${encodedValue};${expires};path=/`;
      },
      getAvatarUser(avatar) {
        if (!avatar) avatar = "uploads/avatar.jpg"
        return  DOMAIN + avatar;
      },

      timeAgo(isoTime) {
        const createdAt = new Date(isoTime);
        const now = new Date();
        const diffMs = now.getTime() - createdAt.getTime();
      
        if (diffMs < 0) return "Vừa xong"; // Tránh trường hợp âm
      
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHr = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHr / 24);
      
        if (diffSec < 60) return `${diffSec} giây trước`;
        if (diffMin < 60) return `${diffMin} phút trước`;
        if (diffHr < 24) return `${diffHr} giờ trước`;
        if (diffDay < 30) return `${diffDay} ngày trước`;
        const diffMonth = Math.floor(diffDay / 30);
        if (diffMonth < 12) return `${diffMonth} tháng trước`;
        const diffYear = Math.floor(diffMonth / 12);
        return `${diffYear} năm trước`;
      },
      fakeView() {
        const random = Math.random();
      
        let views;
        if (random < 0.6) {
          // 60% khả năng trong khoảng 100 - 1,000
          views = Math.floor(Math.random() * 900) + 100;
        } else if (random < 0.9) {
          // 30% khả năng trong khoảng 1,000 - 10,000
          views = Math.floor(Math.random() * 9000) + 1000;
        } else {
          // 10% khả năng trong khoảng 10,000 - 50,000
          views = Math.floor(Math.random() * 40000) + 10000;
        }
      
        // Format số có chữ 'x'
        if (views >= 1000) {
          const formatted = (views / 1000).toFixed(views >= 10000 ? 0 : 1);
          return `${formatted}x`;
        } else {
          return `${views}x`;
        }
      },
      // fakeView(isoTime) {
      //   const createdAt = new Date(isoTime);
      //   const now = new Date();
      //   const diffMs = now.getTime() - createdAt.getTime();
      
      //   if (diffMs < 0) return 0; // Tránh âm
      
      //   const diffMin = Math.floor(diffMs / 1000 / 60); // phút
      //   const diffHour = Math.floor(diffMin / 60);
      //   const diffDay = Math.floor(diffHour / 24);
      
      //   // Công thức view ảo linh hoạt hơn
      //   let views = 20 + diffMin * 1.5;
      
      //   if (diffHour > 1) {
      //     views += diffHour * 10;
      //   }
      
      //   if (diffDay >= 1) {
      //     views += diffDay * 100;
      //   }
      
      //   return Math.floor(views);
      // },      
    }
  };
  