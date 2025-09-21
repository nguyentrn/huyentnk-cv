// src/components/common/TikTokEmbed.tsx
import { useEffect } from "react";

interface TikTokEmbedProps {
  embedHtml: string;
}

const TIKTOK_SCRIPT_SRC = "https://www.tiktok.com/embed.js";

export const TikTokEmbed = ({ embedHtml }: TikTokEmbedProps) => {
  useEffect(() => {
    // Kiểm tra xem script đã tồn tại chưa để tránh chèn nhiều lần
    if (document.querySelector(`script[src="${TIKTOK_SCRIPT_SRC}"]`)) {
      // Nếu có, chỉ cần gọi hàm load của TikTok (nếu có)
      // TikTok embed script tự động xử lý việc này, nên chúng ta không cần làm gì thêm
      return;
    }

    const script = document.createElement("script");
    script.src = TIKTOK_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);

    // Dọn dẹp script khi component bị unmount
    return () => {
      const existingScript = document.querySelector(
        `script[src="${TIKTOK_SCRIPT_SRC}"]`,
      );
      if (existingScript) {
        // Thông thường không cần gỡ script, vì nó có thể được dùng ở trang khác
        // Nhưng nếu muốn dọn dẹp triệt để, có thể dùng: document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div
      className="my-8 flex justify-center"
      dangerouslySetInnerHTML={{ __html: embedHtml }}
    />
  );
};
