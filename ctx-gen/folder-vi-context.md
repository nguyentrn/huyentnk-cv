# Ngữ cảnh cho thư mục: src/locales/vi/

## PHẦN A: PHÂN TÍCH CÁC FILE MỤC TIÊU

Phần này phân tích chi tiết các file được yêu cầu ban đầu.

### Phân tích file: `src/locales/vi/common.json`

#### Nội dung file

```json
{
  "navbar": {
    "home": "Trang chủ",
    "about": "Về mình",
    "portfolio": "Dự án của mình",
    "cv": "CV",
    "downloadCV": "Tải CV",
    "name": "Trương Nguyễn\nKhánh Huyền",
    "initials": "Khánh Huyền",
    "close": "Đóng"
  },
  "home": {
    "greeting": "Xin chào, mình là Khánh Huyền.",
    "headline": "Lắng nghe, thấu hiểu và kể những câu chuyện ý nghĩa.",
    "subheading": "Mỗi thương hiệu đều có một câu chuyện riêng. Mình ở đây để lắng nghe, tìm kiếm những điều đặc biệt và giúp câu chuyện đó được tỏa sáng.",
    "ctaPrimary": "Khám phá dự án",
    "ctaSecondary": "Hồ sơ của mình"
  },
  "about": {
    "pageTitle": "Hành trình của mình",
    "headline": "Từ một lựa chọn an toàn đến một đam mê đích thực.",
    "story": {
      "title": "Bốn năm và một quyết định quan trọng",
      "content": "Con đường của mình không phải là một đường thẳng. Mình đã bắt đầu tại Đại học Y khoa - một lựa chọn được xem là an toàn và đáng tự hào. Đó là một môi trường rèn luyện cho mình sự kỷ luật, tư duy logic và khả năng làm việc dưới áp lực cực lớn.\n\nNhưng sâu bên trong, mình nhận ra đó không phải là nơi mình thực sự thuộc về. Mình khao khát một môi trường năng động hơn, nơi mình có thể dùng sự sáng tạo để tạo ra những kết nối ở quy mô lớn hơn, thay vì chỉ là những tương tác một-một. Thú thật, đó là một quyết định không hề dễ dàng."
    },
    "bridge": {
      "title": "Giai đoạn 'bắc cầu'",
      "content": "Thay vì vội vàng, mình dành thời gian để thực sự 'nghiên cứu' và 'thử nghiệm'. Mình tìm hiểu sâu về ngành Marketing, tham gia các khóa học online, tự thực hiện những dự án nhỏ đầu tiên. Giai đoạn này giúp mình khẳng định chắc chắn rằng: **đây chính là con đường mình muốn đi.** Nó không phải là một 'khoảng trống', mà là một 'cây cầu' được xây dựng có chủ đích."
    },
    "approach": {
      "title": "Và đây là cách mình làm Marketing hôm nay",
      "intro": "Hành trình đó đã định hình con người và cách mình làm việc. Mình không đến với Marketing một cách tình cờ, mà bằng một sự lựa chọn có ý thức. Vì vậy, mình luôn tiếp cận mọi thứ với:",
      "items": [
        {
          "title": "Sự Tò mò và Ham học hỏi",
          "desc": "Vì là người 'ngoại đạo', mình luôn có tâm thế của một người mới, không ngại đặt câu hỏi và luôn tìm tòi để hiểu sâu vấn đề."
        },
        {
          "title": "Tư duy Logic & Rõ ràng",
          "desc": "Nền tảng khoa học giúp mình tiếp cận các vấn đề marketing một cách có hệ thống, từ nghiên cứu, lập kế hoạch đến đo lường hiệu quả."
        },
        {
          "title": "Sự Kiên định và Cam kết",
          "desc": "Mình đã nỗ lực rất nhiều để được ở đây. Vì vậy, mình cam kết mang đến 100% nỗ lực và tinh thần trách nhiệm cho mỗi công việc mình làm."
        }
      ]
    }
  },
  "projectDetail": {
    "backToProjects": "Quay lại trang dự án",
    "projectNotFound": "Ối, không tìm thấy dự án rồi!",
    "projectNotFoundMessage": "Có vẻ như dự án bạn tìm không có ở đây. Mời bạn quay lại và khám phá những câu chuyện khác nhé."
  }
}

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/locales/vi/portfolio.json`

#### Nội dung file

```json
{
  "pageTitle": "Những câu chuyện mình đã kể",
  "exploreProject": "Xem chi tiết dự án",
  "overview": "Tổng quan",
  "noProjectsFound": "Hiện chưa có dự án nào trong danh mục này.",
  "categories": [
    {
      "name": "Tất cả",
      "slug": "all"
    },
    {
      "name": "Sáng tạo Nội dung & Kể chuyện",
      "slug": "content"
    },
    {
      "name": "Nghiên cứu & Chiến lược",
      "slug": "strategy"
    },
    {
      "name": "Thực thi Kênh Digital",
      "slug": "digital"
    }
  ],
  "projects": [
    {
      "slug": "marketing-dich-vu-campaign",
      "name": "Làm mới Tour du lịch Lịch sử \"Cao Bằng - Pác Bó - Thác Bản Giốc\" của Saigontourist",
      "designation": "Hoạch định Chiến lược & Sáng tạo",
      "categorySlug": "strategy",
      "quote": "Mình luôn tự hỏi, làm thế nào để lịch sử không chỉ nằm trên những trang sách mà còn là một trải nghiệm có thể \"chạm\" tới? Dự án này là câu trả lời của mình.",
      "src": "/images/mardv/Brochure-1.png",
      "heroImage": "/images/mardv/Brochure-1.png",
      "overview": "Đây là một case study chi tiết về quá trình mình giải quyết bài toán: \"Làm thế nào để làm mới sản phẩm tour du lịch lịch sử của Saigontourist?\". Giải pháp của mình là một chiến dịch marketing toàn diện, bắt đầu từ việc thay đổi trải nghiệm du lịch bằng công nghệ VR, sau đó xây dựng câu chuyện và thực thi trên đa kênh (Print, OOH, Event).",
      "details": [
        {
          "label": "Bối cảnh",
          "value": "Dự án Môn học\nMarketing dịch vụ"
        },
        {
          "label": "Thương hiệu",
          "value": "Saigontourist"
        },
        {
          "label": "Vai trò",
          "value": "Lên ý tưởng & Thực thi"
        }
      ],
      "content": "### Hành trình tư duy của mình\n\n**1. Bắt đầu từ một câu hỏi**\n\nLàm thế nào để một tour du lịch về nguồn có thể trở nên hấp dẫn hơn với những người trẻ tuổi, năng động, yêu thích công nghệ bên cạnh nhóm khách hàng truyền thống? Thay vì chỉ nghĩ về quảng cáo, mình bắt đầu từ chính trải nghiệm của du khách. Mình nhận ra, điều còn thiếu là sự tương tác, một trải nghiệm du lịch đa giác quan. Từ đó, ý tưởng tích hợp công nghệ Thực tế ảo (VR) vào tour du lịch ra đời, để du khách “sống lại” những khoảnh khắc lịch sử tại khu di tích, mang đến một chiều sâu cảm xúc hoàn toàn mới trong hành trình.\n\n**2. Từ ý tưởng đến câu chuyện**\n\nKhi đã có điểm nhấn là VR, mình bắt đầu xây dựng một câu chuyện chung cho toàn bộ chiến dịch: “Sống lại lịch sử - Cảm trọn hành trình”. Đây là lời hứa về một trải nghiệm cảm xúc, chứ không chỉ là một chuyến tham quan đơn thuần.\n\n**3. Hiện thực hóa câu chuyện qua thiết kế**\n\nĐể câu chuyện được lan tỏa, mình đã thiết kế một bộ ấn phẩm đồng bộ, mỗi thứ có một nhiệm vụ riêng. Vì đây là một tour du lịch đến vùng núi sông hùng vĩ, một thiên nhiên hoang sơ bao la Cao Bằng, cho nên mình đã xây dựng hệ thống nhận diện của chiến dịch một cách nhất quán. Sử dụng tông màu xanh lá cây của núi rừng và xanh ngọc của sông nước làm chủ đạo, kết hợp với màu vàng cam để tạo điểm nhấn cho các thông điệp quan trọng (giá, khuyến mãi). Hình ảnh luôn có sự kết hợp giữa cảnh quan hùng vĩ và yếu tố công nghệ (trải nghiệm kính VR), nhấn mạnh vào yếu tố đặc biệt của tour du lịch này.\n\n**Giai đoạn 1: Khơi gợi sự tò mò (Print)**\n\n<img src=\"/images/mardv/Flyer.png\" alt=\"Tờ rơi (Flyer) giới thiệu chung về tour du lịch trải nghiệm VR.\">\n\n**Bố cục:** Sử dụng hình ảnh Thác Bản Giốc hùng vĩ làm nền (hero image) để thể hiện vẻ đẹp hùng vĩ của thiên nhiên. Bốn ảnh nhỏ được lồng ghép để giới thiệu các điểm đến đa dạng trong tour (Hồ Ba Bể, Động Ngườm Ngao, Khu di tích Pác Bó).\n\n- Yếu tố con người và công nghệ: Hình ảnh người đàn ông đeo kính VR được đặt ở vị trí nổi bật, không chỉ tạo sự tò mò mà còn trực tiếp giải thích cho tagline “Sống lại lịch sử - Cảm trọn hành trình”. Đây chính là USP của sản phẩm.\n\n- Tiêu đề: “Cao Bằng - Pác Bó - Thác Bản Giốc” được thiết kế với font chữ mềm mại, bay bổng, gợi cảm giác phiêu lưu, khám phá.\n\n- Call-to-Action (CTA): Nút “ĐẶT NGAY” và số hotline 1900 1808 được đặt ở vị trí dễ thấy, thúc đẩy hành động từ khách hàng.\n\n<img src=\"/images/mardv/Brochure-1.png\" alt=\"Mặt trước của brochure khi mở ra, trình bày chi tiết lịch trình.\">\n\n**Bố cục:** Tận dụng cấu trúc 3 mặt của brochure để phân chia thông tin một cách logic:\n\n- Trang bìa: Hình ảnh chính của tour du lịch “Thác Bản Giốc” và tagline chính, gây ấn tượng mạnh và tạo sự tò mò để mở ra xem, mã QR dẫn đến trang thông tin chi tiết và logo thương hiệu.\n\n- Trang giới thiệu: Hình ảnh sắc nét về những địa điểm sẽ tham quan và nhấn mạnh trải nghiệm VR trong tour.\n\n- Trang thông tin: Giới thiệu chi tiết “TOUR BAO GỒM” (tham quan, khách sạn, xe) bằng cách sử dụng các icon trực quan, dễ hiểu. Thông tin liên hệ rõ ràng (Website, Email, Phone, Facebook).\n\n<img src=\"/images/mardv/Brochure-2.png\" alt=\"Mặt sau của brochure khi mở ra, với các gói tour và thông tin khuyến mãi.\">\n\n- Tập trung vào “SALE” nhân dịp đặc biệt: Thiết kế to, nổi bật và khác biệt để thu hút sự chú ý ngay lập tức. Thông tin \"Thời gian áp dụng\" được đặt ngay cạnh mức giá đã giảm, thôi thúc khách hàng ra quyết định nhanh chóng. Các con số về giá được làm nổi bật với màu sắc tương phản (vàng, đỏ) để tăng sự chú ý.\n\n- Phân cấp ưu đãi: Các “Gói Gia đình\" và \"Gói Cao cấp\" được tách biệt rõ ràng, mỗi gói có thông tin về giá, dịch vụ đi kèm (thể hiện bằng icon trực quan) để khách hàng dễ dàng so sánh và lựa chọn.\n\n**Giai đoạn 2: Tạo điểm nhấn (Event)**\n\n<img src=\"/images/mardv/Event-flyer.png\" alt=\"Tờ rơi (Flyer) dành riêng cho sự kiện ra mắt trải nghiệm VR.\">\n\nNhằm thông báo và kêu gọi mọi người đến tham gia sự kiện trải nghiệm miễn phí công nghệ VR, tạo hiệu ứng truyền thông và thu thập dữ liệu khách hàng tiềm năng.\n\n- Điểm nhấn chính: Chữ \"VR\" được cách điệu, lồng ghép hình ảnh thiên nhiên và trở thành trung tâm của thiết kế, truyền tải ngay lập tức nội dung của sự kiện. Bên cạnh đó là hình ảnh người trải nghiệm kính VR để nhấn mạnh nội dung của sự kiện.\n\n- Thông tin rõ ràng: Các thông tin quan trọng nhất (Thời gian - Ngày - Địa điểm) được trình bày trong các khối màu riêng biệt, dễ đọc. Từ \"MIỄN PHÍ\" được làm in đậm nổi bật để tăng sức hấp dẫn.\n\nBên cạnh thông tin liên hệ thì còn có mã QR để khách hàng \"Đăng ký tham gia ngay\", giúp việc thu thập thông tin và đo lường hiệu quả trở nên dễ dàng.\n\n**Giai đoạn 3: Tăng độ nhận diện (OOH)**\n\n<img src=\"/images/mardv/Billboard.png\" alt=\"Thiết kế quảng cáo ngoài trời (Billboard) cho tour du lịch Saigontourist.\">\n\nÝ tưởng thiết kế:\n- Hình ảnh Thác Bản Giốc hùng vĩ làm nền, lập tức thu hút ánh nhìn và khơi gợi cảm xúc về du lịch thiên nhiên.\n- Dòng chữ \"Trải nghiệm địa danh lịch sử bằng công nghệ thực tế ảo VR\" với màu xanh nổi bật và font chữ lớn, truyền tải ngay lập tức điểm khác biệt độc nhất của sản phẩm.\n- Con số khuyến mãi \"10%\" và giá \"4.050.000 VNĐ\" màu vàng cam tương phản cao, và thời gian áp dụng tạo điểm nhấn về lợi ích kinh tế và tạo sự khẩn cấp. Logo Saigontourist ở góc trái củng cố nhận diện thương hiệu.\n\nBố cục chung:\n- Thay vì sắp xếp các khối thông tin tĩnh, mình sử dụng bố cục lệch, các khung ảnh \"polaroid\" nghiêng để tạo cảm giác chuyển động, phiêu lưu, thu thập trong hành trình. Hình ảnh người đàn ông đeo kính VR như đang \"tương tác\" với các bức ảnh, củng cố mạnh mẽ ý tưởng trải nghiệm công nghệ.\n\nNgười chờ xe có đủ thời gian để xem các chi tiết: các ảnh nhỏ giới thiệu điểm đến trong tour, thông tin liên hệ chi tiết và đặc biệt là mã QR \"Thông tin chi tiết\" để quét và tìm hiểu ngay trên điện thoại.",
      "keyTakeaways": {
        "title": "Bài học rút ra",
        "items": [
          "Tư duy chiến lược và giải quyết vấn đề: Nhận diện đúng thách thức kinh doanh và đề xuất giải pháp từ gốc rễ (trải nghiệm sản phẩm), chứ không chỉ ở bề mặt (quảng cáo).",
          "Lên kế hoạch và thực thi: Mình đã học cách đóng góp, chia sẻ và hoàn thiện ý tưởng marketing cùng nhóm, sau đó chuyển hóa chúng thành ngôn ngữ hình ảnh sao cho hiệu quả. Xây dựng một kế hoạch cụ thể, từ ý tưởng lớn, câu chuyện truyền thông, đến việc triển khai nhất quán trên nhiều kênh khác nhau.",
          "Sáng tạo nội dung đa kênh: Thiết kế các ấn phẩm phù hợp với mục tiêu và đặc thù của từng kênh, từ in ấn, sự kiện đến quảng cáo ngoài trời. Mỗi yếu tố thiết kế phục vụ một mục tiêu marketing cụ thể nhưng đều nhất quán dựa trên một ý tưởng cốt lõi."
        ]
      }
    },
    {
      "slug": "dau-dau-livestream-poster",
      "name": "Thiết kế ấn phẩm quảng cáo cho buổi Livestream bán hàng trên Mạng xã hội",
      "designation": "Thiết kế Đồ họa & Tư duy Social Media",
      "categorySlug": "digital",
      "quote": "Thiết kế này hướng đến nhóm khách hàng trẻ, năng động, thường xuyên sử dụng mạng xã hội và có thói quen \"săn sale\" qua livestream. Với dự án này, mình tập trung vào màu sắc tươi sáng, thông điệp rõ ràng, một chút vui nhộn cùng tiêu đề hấp dẫn \"DEAL HỜI QUÀ HOT\" để nổi bật trên newfeed của người dùng.",
      "src": "/images/qtbh/livestream-kv.png",
      "heroImage": "/images/qtbh/livestream-kv.png",
      "overview": "Thiết kế một ấn phẩm thông báo hiệu quả, không chỉ cung cấp thông tin mà còn phải đủ sức hút để nổi bật giữa hàng ngàn nội dung khác trên newfeed, giữ chân người xem và thôi thúc họ đặt lịch nhắc xem livestream.",
      "details": [
        {
          "label": "Bối cảnh",
          "value": "Dự án Môn học\nQuản trị bán hàng"
        },
        {
          "label": "Thương hiệu",
          "value": "Đậu Đậu (Giả định)"
        },
        {
          "label": "Vai trò",
          "value": "Lên ý tưởng & Thiết kế"
        },
        {
          "label": "Mục tiêu",
          "value": "Tăng lượng người xem, tương tác cho buổi livestream và thúc đẩy doanh số"
        }
      ],
      "content": "### Hành trình tư duy của mình\n\n**1. Thách thức: Cuộc chiến 3 giây trên Newsfeed**\n\nNgười dùng mạng xã hội lướt rất nhanh. Một thiết kế nếu không nổi bật và dễ hiểu ngay lập tức sẽ bị bỏ qua. Vì vậy, câu hỏi mình đặt ra không phải là \"làm sao cho đẹp?\", mà là \"làm sao để người xem dừng lại, hiểu ngay, và muốn tham gia?\".\n\n**2. Giải pháp thiết kế có chủ đích**\n\nTừ thách thức đó, mỗi yếu tố trong thiết kế này đều có một nhiệm vụ riêng:\n\n<img src=\"/images/qtbh/livestream-kv.png\" alt=\"Social Media Post cho livestream Đậu Đậu\">\n\n**Màu sắc & Bố cục:**\nMình chọn tông màu xanh lá-vàng tươi mát để tạo cảm giác liên kết trực tiếp đến sản phẩm (xơ mướp, sản phẩm tự nhiên) và tên thương hiệu (\"Đậu Đậu\") và tông màu này sẽ nổi bật trên nền trắng-xanh của Facebook.\nCác sản phẩm (từ xơ mướp) được đặt ở vị trí trung tâm, giúp khách hàng nhận diện ngay mặt hàng chính của buổi live.\nCác icon reaction của Facebook được sắp xếp bay lượn, tạo không khí năng động, vui vẻ, nhiều tương tác của một buổi live.\n\n**Phân cấp thông điệp:** Thông tin quan trọng nhất phải được thấy đầu tiên. Vì vậy, cụm từ \"DEAL HỜI QUÀ HOT\" và dải banner \"Giảm 50% toàn live\" được thiết kế với kích thước lớn và đặt ở vị trí trung tâm, dễ thấy nhất, nhấn mạnh lợi ích lớn nhất cho khách hàng.\n\n**Các ưu đãi khác:** Các coupon nhỏ ở phía dưới (Coupon Minigame, Combo quà tặng, Deal 1K) đóng vai trò là những lý do phụ để thuyết phục người xem rằng đây là một buổi live có nhiều giá trị và không thể bỏ lỡ.",
      "keyTakeaways": {
        "title": "Bài học rút ra",
        "items": [
          "Tư duy Visual Marketing: Hiểu cách sử dụng màu sắc, bố cục để thu hút sự chú ý và truyền tải thông điệp một cách nhanh chóng trong môi trường digital.",
          "Thiết kế hướng đến chuyển đổi: Hiểu rõ tâm lý \"săn sale\" và biết cách trình bày các ưu đãi một cách hấp dẫn nhất để tối đa hóa tỷ lệ chuyển đổi (thúc đẩy người xem tham gia livestream).",
          "Hiểu biết về thương hiệu và nền tảng: Tạo ra một thiết kế có cá tính, vừa phù hợp với tinh thần của thương hiệu (\"Đậu Đậu\"), vừa tối ưu cho đặc thù của nền tảng mạng xã hội."
        ]
      }
    },
    {
      "slug": "bia-saigon-that-tuu",
      "name": "BST \"Bia Saigon Thất Tửu\"",
      "designation": "Ý tưởng & Thiết kế Bao bì",
      "categorySlug": "content",
      "quote": "Với mình, bia không chỉ là thức uống, mà còn có thể là một sứ giả văn hóa. Đây là cách mình thử dùng thiết kế để truyền tải câu chuyện và kết nối thương hiệu với những giá trị truyền thống.",
      "src": "/images/imc/Saigon-that-tuu.png",
      "heroImage": "/images/imc/Saigon-that-tuu.png",
      "overview": "Thách thức đặt ra trong dự án môn học này là làm thế nào để Bia Saigon Lager có một chiến dịch Tết không chỉ khác biệt, mà còn tạo ra một kết nối cảm xúc sâu sắc với người tiêu dùng, củng cố vị thế thương hiệu mang đậm tinh thần và niềm tự hào dân tộc.",
      "details": [
        {
          "label": "Bối cảnh",
          "value": "Dự án Môn học IMC"
        },
        {
          "label": "Thương hiệu",
          "value": "Bia Saigon Lager"
        },
        {
          "label": "Sản phẩm",
          "value": "BST phiên bản giới hạn"
        },
        {
          "label": "Thông điệp",
          "value": "Cùng Lager nâng ly, tiếp lửa cho những làng nghề"
        }
      ],
      "content": "### Ý tưởng chính\n\nDịp Tết là lúc mọi người hướng về cội nguồn, để tôn vinh những tinh hoa đã làm nên bản sắc dân tộc. Thay vì chỉ nói về Tết, thì hãy hành động vì Tết, vì những giá trị văn hóa cốt lõi của người Việt. Mình nghĩ, tại sao không kết hợp sản phẩm của Bia Saigon Lager với những câu chuyện văn hóa? Để một sản phẩm tiêu dùng hàng ngày trở thành một phương tiện truyền thông mạnh mẽ, một cầu nối giữa người tiêu dùng hiện đại và những giá trị truyền thống đang dần bị lãng quên.\n\nBộ sưu tập 7 lon bia “Saigon Thất Tửu” như một phiên bản giới hạn đặc biệt cho mùa Tết Bính Ngọ 2026, biến mỗi lon bia thành một câu chuyện, một lời tri ân và một hành động “tiếp lửa” thiết thực cho những làng nghề truyền thống Việt đang dần mai một. Bia Saigon Lager sẽ kết hợp với làng nghề đan lát Thái Mỹ để tạo nên những giỏ quà tặng đan lát dịp Tết giúp tạo thêm nguồn tiêu thụ và giới thiệu thêm về sản phẩm của làng nghề.\n\nThông điệp \"Cùng Lager nâng ly, tiếp lửa cho những làng nghề\", không chỉ là một tagline, mà là một lời kêu gọi hành động. “Nâng ly” trong những dịp tụ họp là hành động thưởng thức bia quen thuộc, nhưng giờ đây nó được một ý nghĩa mới – hành động “tiếp lửa”, ủng hộ và lan tỏa giá trị của các làng nghề.\n\nMục tiêu của chiến dịch IMC lần này là tăng thiện cảm của người tiêu dùng đối với Bia Saigon Lager, thương hiệu không chỉ hướng đến trải nghiệm thưởng thức bia mà còn mang sứ mệnh bảo tồn và lan tỏa giá trị văn hóa. Trong chiến dịch sẽ có những hoạt động hỗ trợ cuộc sống của những nghệ nhân làng nghề, giúp họ có cơ hội tiếp cận thị trường rộng lớn hơn, phát triển hơn trong thời đại mới.\n\n### Hành trình tư duy và thiết kế\n\n**Nghiên cứu, chọn lọc và xây dựng câu chuyện**\n\nMình đã bắt đầu bằng việc nghiên cứu thông tin về các làng nghề truyền thống của Việt Nam, đặc biệt là những nơi đang gặp khó khăn. Mình đã chọn ra 7 làng nghề tiêu biểu, mỗi nơi mang một nét đặc trưng riêng (gốm, rèn, dệt, sơn mài...).\nVới mỗi làng nghề, mình đã xây dựng một câu chuyện ngắn gọn nhưng giàu cảm xúc, nêu bật vẻ đẹp và cả nỗi trăn trở của họ. Đây chính là phần \"hồn\" của mỗi thiết kế.\n\n**Sáng tạo những lời chúc mang hơi thở riêng của mỗi nghề truyền thống**\n\nĐể mỗi lon bia trở thành một món quà ý nghĩa trong dịp Tết, mình đã sáng tác các cặp câu chúc mang vần điệu, vừa liên quan đến đặc trưng của làng nghề, vừa mang ý nghĩa may mắn, phát đạt cho năm mới.\n\n**Quá trình thiết kế bao bì**\n\nBao bì là kênh truyền thông trực tiếp và mạnh mẽ nhất của sản phẩm. Mình đã học được cách biến nó thành một công cụ kể chuyện, truyền tải sứ mệnh và tạo ra sự khác biệt.\n\nYếu tố tiên quyết là phải giữ được những đặc điểm nhận diện cốt lõi của Bia Saigon Lager (biểu tượng rồng vàng, dải ruy băng chéo). Mình chỉ can thiệp vào một mặt của lon bia, đảm bảo người tiêu dùng vẫn nhận ra thương hiệu quen thuộc.\n\nMình đã sử dụng những họa tiết mang tính truyền thống, hình ảnh chân thực của người nghệ nhân làng nghề đang lao động. Vì là một bộ sưu tập đặc biệt cho dịp Tết, nên mình đã thay đổi từ màu xanh lá cây đậm đặc trưng của thương hiệu Saigon Lager thành màu đỏ may mắn, mang ý nghĩa chúc phúc và thịnh vượng cho năm mới. Cả 7 lon bia đều tuân thủ một bố cục nhất quán, dòng chữ tên bộ sưu tập “Sài Gòn thất tửu”, “Tết Bính Ngọ” và \"Limited Edition\" khẳng định giá trị đặc biệt của sản phẩm, là phiên bản độc nhất của chiến dịch.\n\n1.  **Nghề làm gốm - Dân tộc Chăm:** \"Đất nở lộc vàng – Xuân sang phát đạt\"\n<img src=\"/images/imc/1.png\" alt=\"Lon Bia Saigon Lager - Nghề làm gốm người Chăm\">\n\n2.  **Nghề rèn - Dân tộc Mông:** \"Lửa tôi gan thép – Vững chí vươn xa\"\n<img src=\"/images/imc/2.png\" alt=\"Lon Bia Saigon Lager - Nghề rèn người Mông\">\n\n3.  **Nghề dệt thổ cẩm - Dân tộc Thái:** \"Dệt chỉ vàng son – May mắn vẹn tròn\"\n<img src=\"/images/imc/3.png\" alt=\"Lon Bia Saigon Lager - Nghề dệt thổ cẩm Thái\">\n\n4.  **Nghề làm mành tre - Đỗ Xá:** “Treo phúc lộc - Đón xuân an khang”\n<img src=\"/images/imc/4.png\" alt=\"Lon Bia Saigon Lager - Nghề làm mành tre Đỗ Xá\">\n\n5.  **Nghề sơn mài - Tương Bình Hiệp:** “Sơn vẽ phú quý - Sáng rạng tương lai”\n<img src=\"/images/imc/5.png\" alt=\"Lon Bia Saigon Lager - Nghề sơn mài Tương Bình Hiệp\">\n\n6.  **Nghề đan lát - dân tộc Tày:** “Bện chặt tài lộc - Đan giữ yêu thương”\n<img src=\"/images/imc/6.png\" alt=\"Lon Bia Saigon Lager - Nghề đan lát người Tày\">\n\n7.  **Nghề làm giấy dó - Nghi Phong:** “Giấy lưu dấu ngọc - Phúc trọn vẹn xuân”\n<img src=\"/images/imc/7.png\" alt=\"Lon Bia Saigon Lager - Nghề làm giấy dó Nghi Phong\">",
      "keyTakeaways": {
        "title": "Bài học rút ra",
        "items": [
          "Tư duy storytelling trong xây dựng thương hiệu: Học được cách biến một sản phẩm trở nên khác biệt và giàu giá trị, khi nó gắn liền với một câu chuyện ý nghĩa, tạo nên sợi dây kết nối sâu sắc giữa thương hiệu và khách hàng.",
          "Bao bì sản phẩm là một kênh truyền thông mạnh mẽ: Hiểu được bao bì là một điểm chạm trực tiếp và thân mật nhất với khách hàng. Thiết kế trên bao bì có thể trở thành kênh kể chuyện, truyền tải sứ mệnh và tạo ra sự nổi bật của thương hiệu so với đối thủ."
        ]
      }
    },
    {
      "slug": "tiktok-channel-growth",
      "name": "Xây dựng Kênh TikTok từ Con số 0",
      "designation": "Content Strategy, Video Production & Community Growth",
      "categorySlug": "content",
      "quote": "Mình tò mò muốn biết, lý thuyết marketing thì nhiều, nhưng thực tế một kênh social được xây dựng từ con số 0 sẽ như thế nào? Kênh TikTok này chính là hành trình mình tự đi tìm câu trả lời.",
      "src": "/images/tiktok/tiktok_hoccungvy.jpg",
      "heroImage": "/images//tiktok/hero-image.png",
      "overview": "Đây là một dự án thực tế của cá nhân mình: tự xây dựng một kênh TikTok từ A-Z. Hành trình này bao gồm tất cả các bước, từ nghiên cứu, sản xuất nội dung, xây dựng cộng đồng, và cuối cùng là thử nghiệm mô hình Affiliate Marketing để tạo ra sự chuyển đổi.",
      "details": [
        {
          "label": "Bối cảnh",
          "value": "Dự án Cá nhân"
        },
        {
          "label": "Nền tảng",
          "value": "TikTok"
        },
        {
          "label": "Vai trò",
          "value": "Tất cả (One-person team)"
        },
        {
          "label": "Kết quả",
          "value": "1.1M+ views, 5.8K+ followers"
        }
      ],
      "content": "### Hành trình tư duy của mình\n\n**1. Giai đoạn 1: Nghiên cứu & Lên kế hoạch**\n\nTrước khi sản xuất bất kỳ video nào, mình đã dành thời gian để nghiên cứu sâu về ngách \"study vlog\": các dạng content đang hiệu quả, thuật toán của TikTok hoạt động ra sao, và khán giả thực sự quan tâm đến điều gì. Giai đoạn này giúp mình định hình được các cột trụ nội dung chính: quá trình học tiếng Trung, chia sẻ kinh nghiệm học tập, truyền động lực và review văn phòng phẩm.\n\n**2. Giai đoạn 2: Bền bỉ Sản xuất Nội dung**\n\nĐây là giai đoạn thử thách nhất. Mình đã tự lên ý tưởng, quay và dựng hơn **70 video** bằng Capcut. Quá trình này giúp mình hiểu rằng sự sáng tạo cần đi đôi với sự bền bỉ. Mỗi video là một cơ hội để thử nghiệm một ý tưởng mới, một cách kể chuyện mới.\n\n<blockquote class=\"tiktok-embed\" cite=\"https://www.tiktok.com/@_hoccungvy/video/7322060812648975634\" data-video-id=\"7322060812648975634\" style=\"max-width: 605px;min-width: 325px;\" > <section> <a target=\"_blank\" title=\"@_hoccungvy\" href=\"https://www.tiktok.com/@_hoccungvy?refer=embed\">@_hoccungvy</a> \uD83E\uDDD0\uD83E\uDDD0 <a title=\"desksetup\" target=\"_blank\" href=\"https://www.tiktok.com/tag/desksetup?refer=embed\">#desksetup</a> <a title=\"hoccungvy\" target=\"_blank\" href=\"https://www.tiktok.com/tag/hoccungvy?refer=embed\">#hoccungvy</a> <a title=\"hantu\" target=\"_blank\" href=\"https://www.tiktok.com/tag/hantu?refer=embed\">#hantu</a> <a title=\"chuhan\" target=\"_blank\" href=\"https://www.tiktok.com/tag/chuhan?refer=embed\">#chuhan</a> <a title=\"chinese\" target=\"_blank\" href=\"https://www.tiktok.com/tag/chinese?refer=embed\">#chinese</a> <a title=\"studychinese\" target=\"_blank\" href=\"https://www.tiktok.com/tag/studychinese?refer=embed\">#studychinese</a> <a title=\"hoctiengtrung\" target=\"_blank\" href=\"https://www.tiktok.com/tag/hoctiengtrung?refer=embed\">#hoctiengtrung</a> <a title=\"tiengtrung\" target=\"_blank\" href=\"https://www.tiktok.com/tag/tiengtrung?refer=embed\">#tiengtrung</a> <a title=\"chinesevocabulary\" target=\"_blank\" href=\"https://www.tiktok.com/tag/chinesevocabulary?refer=embed\">#chinesevocabulary</a> <a title=\"中文\" target=\"_blank\" href=\"https://www.tiktok.com/tag/%E4%B8%AD%E6%96%87?refer=embed\">#中文</a> <a title=\"汉语\" target=\"_blank\" href=\"https://www.tiktok.com/tag/%E6%B1%89%E8%AF%AD?refer=embed\">#汉语</a>  <a title=\"汉语学习\" target=\"_blank\" href=\"https://www.tiktok.com/tag/%E6%B1%89%E8%AF%AD%E5%AD%A6%E4%B9%A0?refer=embed\">#汉语学习</a> <a title=\"汉字\" target=\"_blank\" href=\"https://www.tiktok.com/tag/%E6%B1%89%E5%AD%97?refer=embed\">#汉字</a>  <a title=\"tuhoctiengtrung\" target=\"_blank\" href=\"https://www.tiktok.com/tag/tuhoctiengtrung?refer=embed\">#tuhoctiengtrung</a>  <a title=\"họctiếngtrung\" target=\"_blank\" href=\"https://www.tiktok.com/tag/h%E1%BB%8Dcti%E1%BA%BFngtrung?refer=embed\">#họctiếngtrung</a> <a title=\"tuvung\" target=\"_blank\" href=\"https://www.tiktok.com/tag/tuvung?refer=embed\">#tuvung</a> <a title=\"tuvungtiengtrung\" target=\"_blank\" href=\"https://www.tiktok.com/tag/tuvungtiengtrung?refer=embed\">#tuvungtiengtrung</a> <a target=\"_blank\" title=\"♬ Nocturne (Piano Instrumental) [Originally Performed By Jay Chou] - 紀鈞瀚 (Bryan Chi)\" href=\"https://www.tiktok.com/music/Nocturne-Piano-Instrumental-7231101464348395521?refer=embed\">♬ Nocturne (Piano Instrumental) [Originally Performed By Jay Chou] - 紀鈞瀚 (Bryan Chi)</a> </section> </blockquote> <script async src=\"https://www.tiktok.com/embed.js\"></script>\n\n\n*Video viral 1.1 triệu lượt xem, minh chứng cho việc thấu hiểu khán giả.*\n\n**3. Giai đoạn 3: Tối ưu & Tăng trưởng**\n\nSau mỗi video, mình đều dành thời gian xem lại các chỉ số: lượt xem, lượt thích, bình luận, thời gian xem trung bình. Dữ liệu này giúp mình hiểu hơn về khán giả và tối ưu các video sau, từ cách đặt tiêu đề, chọn nhạc nền, đến việc sử dụng hashtag sao cho hiệu quả.\n\n**4. Giai đoạn 4: Tạo ra giá trị & Chuyển đổi**\n\nKhi kênh đạt 1.000 followers, mình bắt đầu thử nghiệm Affiliate Marketing. Đây là một bước quan trọng để kiểm chứng xem liệu sự yêu thích của khán giả có thể chuyển hóa thành hành động mua hàng hay không. Kết quả tích cực đã cho mình một bài học quý giá về việc xây dựng lòng tin và tạo ra giá trị thực tế.",
      "keyTakeaways": {
        "title": "Những điều mình tâm đắc nhất",
        "items": [
          "**Bài học về sự thấu hiểu:** Mình nhận ra content viral không đến từ sự may mắn, mà từ việc thực sự thấu hiểu khán giả và tạo ra nội dung giải quyết được điều đó.",
          "**Bài học về sự kiên trì:** Xây dựng một cộng đồng cần thời gian và sự bền bỉ. 70+ video chính là minh chứng cho thấy chỉ cần kiên trì, kết quả sẽ đến.",
          "**Bài học về phễu marketing:** Dự án này giúp mình trải nghiệm toàn bộ phễu marketing trong thực tế: từ tạo nhận diện (views), xây dựng cộng đồng (followers), đến chuyển đổi (affiliate sales). Đây là bài học quý giá nhất."
        ]
      }
    },
    {
      "slug": "pepsi-tvc-concept",
      "name": "Hiện thực hóa Ý tưởng TVC",
      "designation": "Lên Kịch bản, Quay & Dựng phim",
      "categorySlug": "content",
      "quote": "Một ý tưởng hay trên giấy và một TVC hoàn chỉnh là hai thế giới khác nhau. Dự án này là hành trình thực tế của mình để đi từ thế giới này sang thế giới kia, với tất cả những thử thách của nó.",
      "src": "/images/tvc-qtth/hero-image.png",
      "heroImage": "/images/tvc-qtth/hero-image.png",
      "overview": "Đây là case study về quá trình hiện thực hóa một ý tưởng TVC quảng cáo cho thương hiệu Pepsi trong điều kiện thực tế của một nhóm sinh viên với nguồn lực giới hạn. Trong dự án này, với vai trò là nhóm trưởng, mình đã học hỏi được không chỉ là về kỹ năng lên kịch bản, quay dựng, edit mà còn là bài học về teamwork, sự linh hoạt và khả năng học hỏi từ những điều chưa hoàn hảo.",
      "details": [
        {
          "label": "Bối cảnh",
          "value": "Dự án Môn học\nQuản trị thương hiệu"
        },
        {
          "label": "Thương hiệu",
          "value": "Pepsi"
        },
        {
          "label": "Vai trò",
          "value": "Nhóm trưởng, Lên kịch bản, Quay & Dựng phim"
        },
        {
          "label": "Hạn chế",
          "value": "Giới hạn nguồn lực và không gian"
        }
      ],
      "content": "### Hành trình tư duy của mình\n\n**1. Thử thách: Từ ý tưởng đến hiện thực**\n\nTrong môn Quản trị thương hiệu, thử thách đặt ra cho nhóm mình là tạo ra một TVC quảng cáo cho thương hiệu Pepsi. Vấn đề lớn nhất không phải là thiếu ý tưởng, mà là làm thế nào để biến ý tưởng đó thành một sản phẩm video cụ thể với kinh phí và các điều kiện thực tế của sinh viên.\n\n**2. Quá trình thực hiện**\n\n- **Lên ý tưởng kịch bản:** Bọn mình cùng nhau brainstorm để tìm ra một câu chuyện đơn giản nhưng phù hợp với tinh thần \"Sảng khoái\" của Pepsi.\n\n- **Điều phối:** Với vai trò là nhóm trưởng, mình đã lập kế hoạch chi tiết, phân công nhiệm vụ phù hợp với điểm mạnh của từng thành viên, từ khâu chuẩn bị cho đến quản lý tiến độ để đảm bảo dự án hoàn thành đúng thời hạn.\n\n- **Quay và phối hợp:** Đây là lúc mình học được nhiều nhất về teamwork. Để có những cảnh quay \"ăn ý\", cả nhóm đã phải phối hợp và hỗ trợ nhau rất nhiều.\n\n- **Hậu kỳ và edit:** Mình đảm nhận phần hậu kỳ, sử dụng các kỹ thuật edit trên Capcut để làm nổi bật sản phẩm và truyền tải được năng lượng của thương hiệu.\n\n**3. Sản phẩm cuối cùng**\n\n<video controls> <source src=\"/images/tvc-qtth/TVC-PEPSI.mp4\" type=\"video/mp4\"></video>\n\n### Nhìn lại và học hỏi\n\nDù TVC chưa hoàn hảo và còn nhiều sai sót do hạn chế về nguồn lực, quá trình này đã cho mình những bài học quý giá. Mình hiểu rằng, một sản phẩm thực tế luôn có những giới hạn, và điều quan trọng là cách chúng ta xoay sở và học hỏi từ chính những giới hạn đó. Sự góp ý của giảng viên và các bạn đã giúp mình cùng nhóm học hỏi được rất nhiều kinh nghiệm và triển khai tốt hơn cho những dự án sau này.",
      "keyTakeaways": {
        "title": "Những điều mình tâm đắc nhất",
        "items": [
          "**Kỹ năng lãnh đạo và quản lý dự án:** Học được cách dẫn dắt một team và biến ý tưởng thành sản phẩm thực tế, biết được tầm quan trọng của việc lập kế hoạch rõ ràng, giao tiếp hiệu quả và tạo động lực cho các thành viên. Mình học được cách lắng nghe, thảo luận và đưa ra quyết định cuối cùng để đạt được mục tiêu tốt nhất cho cả nhóm.",
          "**Bài học về sự linh hoạt:** Mình học được cách sáng tạo và tìm ra giải pháp trong điều kiện nguồn lực giới hạn.",
          "**Bài học về teamwork:** Mình hiểu rằng để tạo ra một sản phẩm chung, việc giao tiếp và hỗ trợ lẫn nhau trong team quan trọng không kém gì kỹ năng cá nhân.",
          "**Bài học về việc tiếp thu phản hồi:** Mình nhận ra rằng những góp ý thẳng thắn từ giảng viên và bạn bè chính là tư liệu quý giá, mình học được cách đón nhận lời phê bình một cách xây dựng để nhận ra thiếu sót và cải thiện kỹ năng của bản thân cho những dự án trong tương lai."
        ]
      }
    }
  ]
}

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/locales/vi/resume.json`

#### Nội dung file

```json
{
  "scanMessage": "Quét để xem Portfolio!",
  "header": {
    "firstName": "Khánh Huyền",
    "lastName": "Trương Nguyễn",
    "position": "Thực tập sinh Marketing"
  },
  "contact": {
    "birthYear": "1999",
    "phone": "(+84) 976 8888 09",
    "email": "huyentnk1504@gmail.com",
    "address": "P. An Khánh, Tp. Hồ Chí Minh",
    "portfolio": "huyentnk.com"
  },
  "heading": {
    "aboutMe": "Giới thiệu",
    "skills": "Kỹ năng",
    "languages": "Ngoại ngữ",
    "tools": "Công cụ",
    "education": "Học vấn",
    "projects": "Kinh nghiệm",
    "certifications": "Chứng chỉ"
  },
  "aboutMe": {
    "summary": "Sinh viên năm 4 ngành Marketing, với thành tích học tập tốt và kiến thức khá vững về Marketing, có kinh nghiệm thực hành thông qua các dự án học thuật và dự án cá nhân. Mong muốn vận dụng kiến thức, kỹ năng và tinh thần chủ động học hỏi vào vị trí Thực tập sinh Marketing để đóng góp vào sự thành công của các chiến lược marketing và mục tiêu phát triển chung của công ty."
  },
  "languages": {
    "items": [
      {
        "label": "Tiếng Anh",
        "tooltip": "TOEIC 650"
      },
      {
        "label": "Tiếng Trung",
        "tooltip": "HSK 3"
      }
    ]
  },
  "tools": {
    "items": [
      {
        "label": "MS Office"
      },
      {
        "label": "Canva"
      },
      {
        "label": "Capcut"
      }
    ]
  },
  "certifications": {
    "items": [
      "Google Digital Garage",
      "Linkedln Marketing Labs",
      "Hubspot Inbound Marketing"
    ]
  },
  "skills": {
    "hardSkills": {
      "title": "Kỹ năng cứng",
      "items": [
        {
          "label": "Sáng tạo Nội dung"
        },
        {
          "label": "Tiếp thị Mạng xã hội"
        }
      ]
    },
    "softSkills": {
      "title": "Kỹ năng mềm",
      "items": [
        {
          "label": "Giao tiếp & Trình bày"
        },
        {
          "label": "Làm việc nhóm"
        }
      ]
    }
  },
  "educations": {
    "items": [
      {
        "university": "Trường Đại học Mở Thành phố Hồ Chí Minh",
        "major": "Marketing",
        "time": "2022 - Hiện tại",
        "gpa": 3.79,
        "desc": "* **GPA:** 3.79/4.0 (hiện tại).\n\n* **Thành tích:** Đạt học bổng KKHT 3/7 học kỳ.\n"
      },
      {
        "university": "Trường Đại học Y khoa Phạm Ngọc Thạch",
        "major": "Y đa khoa",
        "time": "2017 - 2021",
        "gpa": null,
        "desc": "* Quá trình giúp bản thân rèn luyện tư duy phân tích, sự tỉ mỉ, khả năng chịu áp lực và tinh thần trách nhiệm, trước khi tự xác định lại đam mê và quyết tâm theo đuổi lĩnh vực Marketing."
      }
    ]
  },
  "projects": {
    "resultLabel": "Kết quả đạt được:",
    "items": [
      {
        "in": "Dự án cá nhân",
        "name": "XÂY DỰNG & PHÁT TRIỂN KÊNH TIKTOK CÁ NHÂN VỀ \"STUDY VLOG\"",
        "desc": [
          "Link kênh: [@_hoccungvy]",
          "Nghiên cứu trends, thuật toán TikTok và hành vi người dùng trong ngách “study vlog”.",
          "Tự sản xuất 70+ video (lên ý tưởng, quay dựng, edit video bằng Capcut) về quá trình tự học tiếng Trung, chia sẻ kinh nghiệm học tập và truyền động lực.",
          "Quản lý lịch đăng bài, tối ưu hóa tiêu đề và áp dụng hashtag phù hợp để tối đa hóa lượt tiếp cận tự nhiên.",
          "Triển khai Affiliate Marketing sau khi đạt 1.000 followers, tạo ra nguồn thu nhập thụ động từ các sản phẩm văn phòng phẩm liên quan."
        ],
        "result": [
          "Phát triển kênh đạt 5.800+ followers và 113.000+ lượt thích.",
          "Sản xuất 1 video viral (1,1+ triệu lượt xem) và 14 video khác (>10.000 lượt xem).",
          "Tạo nguồn thu nhập thụ động thành công qua Affiliate Marketing, chứng minh khả năng chuyển đổi người xem thành người mua.",
          "Phát triển kỹ năng content video, edit video, nắm bắt xu hướng social."
        ]
      },
      {
        "in": "Thực tập sinh Marketing",
        "name": "CÔNG TY CỔ PHẦN THẾ GIỚI TIN HỌC",
        "time": "4/2024 - 5/2024",
        "desc": [
          "Hỗ trợ công ty trưng bày gian hàng triển lãm; gặp gỡ, tư vấn và thu thập thông tin khách hàng tại \"Triển lãm quốc tế điện tử & thiết bị thông minh Việt Nam 2024\" tổ chức tại SECC. ",
          "Biên soạn các bài viết giới thiệu sản phẩm camera của công ty chuẩn SEO, tập trung vào các từ khóa để cải thiện khả năng hiển thị trên công cụ tìm kiếm.",
          "Nghiên cứu thị trường, phân tích các hoạt động của đối thủ cạnh tranh và thu thập dữ liệu về các dòng sản phẩm công nghệ mới."
        ]
      }
    ]
  }
}
```

#### Mối quan hệ

*   **Imports:** (Không có)

---

