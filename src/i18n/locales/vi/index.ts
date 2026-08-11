const vi = {
  common: {
    actions: {
      save: "Lưu",
      saveChanges: "Lưu thay đổi",
      cancel: "Hủy",
      close: "Đóng",
      create: "Tạo mới",
      edit: "Chỉnh sửa",
      delete: "Xóa",
      retry: "Thử lại",
      search: "Tìm kiếm",
      viewDetails: "Xem chi tiết",
      showMore: "Xem thêm…",
    },
    states: {
      loading: "Đang tải…",
      saving: "Đang lưu…",
      creating: "Đang tạo…",
      updating: "Đang cập nhật…",
      deleting: "Đang xóa…",
      noInformation: "Không có thông tin",
      noResults: "Không tìm thấy kết quả phù hợp.",
    },
    status: {
      active: "Đang hoạt động",
      inactive: "Ngừng hoạt động",
      all: "Tất cả",
    },
    fields: {
      status: "Trạng thái",
      actions: "Thao tác",
      name: "Tên",
      email: "Email",
      phone: "Số điện thoại",
      notes: "Ghi chú",
    },
    entityPicker: {
      defaultTitle: "Danh sách lựa chọn",
      search: "Tìm kiếm…",
      loading: "Đang tải dữ liệu…",
      empty: "Không có dữ liệu",
    },
    pagination: {
      previousPage: "Trang trước",
      nextPage: "Trang sau",
      goToPage: "Đi đến trang {{page}}",
    },
    roles: {
      ADMIN: "Quản trị hệ thống",
      MANAGER: "Quản lý",
      RECEPTION: "Lễ tân",
      RECEPTIONIST: "Lễ tân",
      HOUSEKEEPING: "Buồng phòng",
      USER: "Khách hàng",
    },
  },
  client: {
    header: {
      navigation: {
        home: "Trang chủ",
        rooms: "Phòng",
        amenities: "Tiện nghi",
        about: "Về chúng tôi",
        contact: "Liên hệ",
      },
      actions: {
        signIn: "Đăng nhập",
        bookNow: "Đặt ngay",
      },
      account: {
        guest: "Khách hàng",
        openMenu: "Mở menu tài khoản của {{name}}",
        profile: "Thông tin cá nhân",
        changePassword: "Đổi mật khẩu",
        logout: "Đăng xuất",
      },
      mobile: {
        openMenu: "Mở menu",
        closeMenu: "Đóng menu",
      },
      language: {
        label: "Ngôn ngữ",
        vi: "Chuyển sang tiếng Việt",
        en: "Chuyển sang tiếng Anh",
      },
    },
    auth: {
      backToHome: "Về trang chủ",
      hero: {
        eyebrow: "DIAMOND SEA ĐÀ NẴNG",
        title: "Một kỳ nghỉ nhẹ nhàng bắt đầu từ đây.",
        description: "Quản lý đặt phòng và chuẩn bị cho hành trình bên biển trong một không gian riêng tư, thuận tiện.",
      },
      password: {
        show: "Hiện mật khẩu",
        hide: "Ẩn mật khẩu",
      },
    },
    login: {
      eyebrow: "TÀI KHOẢN KHÁCH HÀNG",
      title: "Chào mừng bạn trở lại.",
      description: "Đăng nhập để xem và quản lý những kỳ nghỉ đã đặt tại Diamond Sea.",
      fields: {
        email: "Email",
        emailPlaceholder: "example@email.com",
        password: "Mật khẩu",
      },
      actions: {
        forgotPassword: "Quên mật khẩu?",
        signIn: "Đăng nhập",
        signingIn: "Đang đăng nhập…",
        signUp: "Đăng ký",
      },
      signUpPrompt: "Chưa có tài khoản?",
      validation: {
        invalidEmail: "Email không hợp lệ",
        invalidPassword: "Mật khẩu không hợp lệ",
      },
      errors: {
        loginFailed: "Email hoặc mật khẩu không hợp lệ.",
      },
      messages: {
        registrationCompleted: "Tài khoản đã được tạo. Bạn có thể đăng nhập để tiếp tục.",
        passwordReset: "Mật khẩu đã được cập nhật. Bạn có thể đăng nhập bằng mật khẩu mới.",
      },
    },
    register: {
      eyebrow: "TẠO TÀI KHOẢN",
      title: "Bắt đầu hành trình cùng Diamond Sea.",
      description: "Tạo tài khoản để lưu thông tin và quản lý các kỳ nghỉ của bạn thuận tiện hơn.",
      fields: {
        fullName: "Họ tên",
        email: "Email",
        phone: "Số điện thoại",
        password: "Mật khẩu",
        confirmPassword: "Nhập lại mật khẩu",
      },
      passwordRequirement: "Mật khẩu cần có ít nhất 6 ký tự.",
      signInPrompt: "Đã có tài khoản?",
      actions: {
        creating: "Đang tạo tài khoản…",
        signUp: "Đăng ký",
        signIn: "Đăng nhập",
      },
      validation: {
        fullNameRequired: "Họ tên không được để trống",
        emailRequired: "Email không được để trống",
        emailInvalid: "Email không hợp lệ",
        phoneRequired: "Số điện thoại không được để trống",
        phoneInvalid: "Số điện thoại không hợp lệ",
        passwordRequired: "Mật khẩu không được để trống",
        passwordLength: "Mật khẩu tối thiểu 6 ký tự",
        confirmPasswordRequired: "Vui lòng nhập lại mật khẩu",
        passwordMismatch: "Mật khẩu nhập lại không khớp",
      },
      errors: {
        registrationFailed: "Không thể tạo tài khoản. Vui lòng thử lại.",
      },
    },
    forgotPassword: {
      eyebrow: "KHÔI PHỤC TÀI KHOẢN",
      title: "Quên mật khẩu?",
      description: "Nhập email gắn với tài khoản và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu.",
      fields: {
        email: "Email",
        emailPlaceholder: "example@email.com",
      },
      actions: {
        sending: "Đang gửi hướng dẫn…",
        sendInstructions: "Gửi hướng dẫn",
        backToLogin: "Quay lại đăng nhập",
      },
      validation: {
        emailRequired: "Email không được để trống",
        emailInvalid: "Email không hợp lệ",
      },
      errors: {
        requestFailed: "Không thể gửi yêu cầu đặt lại mật khẩu. Vui lòng thử lại.",
      },
      success: {
        title: "Kiểm tra email của bạn.",
        description: "Nếu địa chỉ này khớp với tài khoản, hướng dẫn đặt lại mật khẩu sẽ được gửi đến hộp thư của bạn.",
        received: "Yêu cầu khôi phục cho {{email}} đã được tiếp nhận. Vui lòng kiểm tra cả thư mục spam.",
      },
    },
    resetPassword: {
      eyebrow: "BẢO MẬT TÀI KHOẢN",
      title: "Đặt lại mật khẩu.",
      description: "Chọn mật khẩu mới cho tài khoản Diamond Sea của bạn.",
      passwordRequirement: "Mật khẩu mới cần có ít nhất 6 ký tự.",
      fields: {
        password: "Mật khẩu mới",
        confirmPassword: "Nhập lại mật khẩu mới",
      },
      actions: {
        updating: "Đang cập nhật…",
        reset: "Đặt lại mật khẩu",
        backToLogin: "Quay lại đăng nhập",
      },
      validation: {
        passwordRequired: "Mật khẩu không được để trống",
        passwordLength: "Mật khẩu tối thiểu 6 ký tự",
        confirmPasswordRequired: "Vui lòng nhập lại mật khẩu",
        passwordMismatch: "Mật khẩu nhập lại không khớp",
      },
      errors: {
        resetFailed: "Không thể đặt lại mật khẩu. Liên kết có thể đã hết hạn.",
      },
    },
    home: {
      hero: {
        location: "BỜ BIỂN ĐÀ NẴNG, VIỆT NAM",
        title: "Chạm vào nhịp sống bên biển.",
        description: "Một kỳ nghỉ hiện đại, thư thái giữa làn gió biển và năng lượng của thành phố Đà Nẵng.",
        bookStay: "Đặt kỳ nghỉ",
        exploreRooms: "Khám phá phòng",
      },
      search: {
        formLabel: "Tìm phòng",
        stayDate: "Ngày lưu trú",
        checkIn: "Nhận phòng",
        checkOut: "Trả phòng",
        guests: "Số khách",
        guestCount: "Số lượng khách",
        submit: "Tìm phòng",
        validation: {
          checkInRequired: "Vui lòng chọn ngày nhận phòng",
          checkOutRequired: "Vui lòng chọn ngày trả phòng",
          dateRangeRequired: "Vui lòng chọn ngày nhận phòng và ngày trả phòng",
        },
      },
      rooms: {
        eyebrow: "KHÔNG GIAN NGHỈ DƯỠNG",
        title: "Phòng dành cho những ngày thật chậm.",
        viewAll: "Xem tất cả hạng phòng",
      },
      roomCard: {
        capacity: "Tối đa {{count}} khách",
        perNight: "/ đêm",
        bookRoom: "Đặt phòng",
      },
      intro: {
        imageAlt: "Kiến trúc hiện đại của Diamond Sea Đà Nẵng",
        eyebrow: "CÂU CHUYỆN DIAMOND SEA",
        title: "Một khoảng nghỉ giữa biển và thành phố.",
        firstParagraph: "Diamond Sea mang đến một điểm dừng chân thanh lịch bên bờ biển Đà Nẵng — nơi phòng nghỉ tiện nghi, vị trí thuận tiện và sự chăm sóc chân thành cùng tạo nên một hành trình nhẹ nhàng.",
        secondParagraph: "Từ buổi sáng đón nắng trên biển đến một ngày khám phá thành phố, mọi trải nghiệm đều được thiết kế để bạn tận hưởng Đà Nẵng theo nhịp riêng.",
        exploreAmenities: "Khám phá tiện nghi",
      },
      amenities: {
        eyebrow: "TIỆN NGHI ĐẶC TRƯNG",
        title: "Mọi điều bạn cần, được chăm chút vừa đủ.",
        items: {
          breakfast: "Bữa sáng mỗi ngày",
          pool: "Hồ bơi thư giãn",
          wifi: "Wi-Fi tốc độ cao",
          parking: "Bãi đỗ xe",
          fitness: "Trung tâm thể hình",
          workspace: "Không gian làm việc",
          reception: "Lễ tân 24/7",
          roomService: "Dịch vụ tại phòng",
        },
      },
      destination: {
        title: "Đà Nẵng ngay ngoài ô cửa.",
        description: "Gần bờ biển, thuận tiện kết nối trung tâm thành phố và những điểm đến đặc trưng của miền Trung.",
        highlights: {
          beach: "Biển Mỹ Khê — vài phút di chuyển",
          dragonBridge: "Cầu Rồng — khoảng 10 phút",
          hoiAn: "Phố cổ Hội An — khoảng 35 phút",
        },
        directions: "Xem đường đi",
        imageAlt: "Không gian nghỉ dưỡng và hồ bơi",
      },
      cta: {
        eyebrow: "KỲ NGHỈ ĐANG CHỜ BẠN",
        title: "Hành trình Đà Nẵng bắt đầu từ đây.",
        description: "Chọn ngày lưu trú và để Diamond Sea chuẩn bị một không gian thật thoải mái cho bạn.",
        bookStay: "Đặt kỳ nghỉ",
      },
    },
    footer: {
      description: "Một kỳ nghỉ hiện đại bên bờ biển, nơi bạn tận hưởng Đà Nẵng theo nhịp riêng.",
      explore: {
        title: "Khám phá",
        rooms: "Phòng nghỉ",
        amenities: "Tiện nghi",
        about: "Về chúng tôi",
        contact: "Liên hệ",
      },
      guestServices: {
        title: "Dịch vụ khách",
        findRooms: "Tìm phòng",
        myBookings: "Đặt phòng của tôi",
        help: "Trợ giúp",
        faq: "Câu hỏi thường gặp",
      },
      contact: {
        title: "Liên hệ",
        address: "71 Ngũ Hành Sơn, Đà Nẵng",
        reception: "Lễ tân phục vụ 24/7",
      },
      legal: {
        terms: "Điều khoản",
        privacy: "Quyền riêng tư",
      },
    },
    search: {
      hero: {
        eyebrow: "KỲ NGHỈ TẠI DIAMOND SEA",
        title: "Chọn không gian nghỉ dành cho bạn.",
        description: "Khám phá các hạng phòng phù hợp với ngày lưu trú và số lượng khách bạn đã chọn.",
      },
      summary: {
        guests_one: "{{count}} khách",
        guests_other: "{{count}} khách",
        nights_one: "{{count}} đêm",
        nights_other: "{{count}} đêm",
      },
      searchForm: {
        formLabel: "Tìm phòng",
        stayDate: "Ngày lưu trú",
        checkIn: "Nhận phòng",
        checkOut: "Trả phòng",
        guests: "Số khách",
        guestCount: "Số lượng khách",
        submit: "Cập nhật tìm kiếm",
      },
      results: {
        title: "Phòng phù hợp với kỳ nghỉ của bạn",
        count_one: "{{count}} hạng phòng khả dụng",
        count_other: "{{count}} hạng phòng khả dụng",
      },
      sort: {
        label: "Sắp xếp phòng",
        priceAscending: "Giá thấp đến cao",
        priceDescending: "Giá cao đến thấp",
      },
      roomCard: {
        eyebrow: "PHÒNG DIAMOND SEA",
        capacity_one: "Tối đa {{count}} khách",
        capacity_other: "Tối đa {{count}} khách",
        pricePerNight: "Giá mỗi đêm",
        soldOut: "Hết phòng",
        selectRoom: "Chọn phòng",
        viewDetails: "Xem chi tiết",
        viewDetailsFor: "Xem chi tiết {{room}}",
      },
      legacyRoomCard: {
        imageAlt: "Hình ảnh {{room}}",
        name: "Phòng {{room}}",
        capacity_one: "{{count}} người",
        capacity_other: "{{count}} người",
        fallbackType: "Hạng phòng",
      },
      states: {
        loading: "Đang tải phòng",
        errorTitle: "Không thể tải phòng khả dụng.",
        errorDescription: "Vui lòng thử lại. Thông tin kỳ nghỉ của bạn vẫn được giữ nguyên.",
        noResultsImageAlt: "Không có phòng phù hợp",
        noResultsTitle: "Chưa có phòng phù hợp cho kỳ nghỉ này.",
        noResultsDescription: "Hãy thử thay đổi ngày nhận phòng, ngày trả phòng hoặc số lượng khách.",
      },
      actions: {
        retry: "Thử lại",
        modifySearch: "Thay đổi tìm kiếm",
      },
      errors: {
        roomTypeUnavailable: "Không còn loại phòng này trong khoảng thời gian này.",
        datesRequired: "Điền đủ thông tin ngày bắt đầu - ngày kết thúc",
      },
    },
    roomDetail: {
      breadcrumbs: {
        label: "Điều hướng",
        home: "Trang chủ",
        rooms: "Phòng nghỉ",
        details: "Chi tiết phòng",
      },
      fallbackRoomName: "Phòng Diamond Sea",
      gallery: {
        fallbackAlt: "Không gian khách sạn Diamond Sea",
        viewImageOfRoom: "Xem ảnh {{index}} của {{room}}",
        viewImage: "Xem ảnh {{index}}",
        imageAlt: "{{room}} - ảnh {{index}}",
        loadError: "Không thể tải ảnh",
        activeImageLoadError: "Không thể tải ảnh này",
        viewAll: "Xem tất cả ảnh",
        dialogLabel: "Thư viện ảnh {{room}}",
        close: "Đóng thư viện ảnh",
        previous: "Ảnh trước",
        next: "Ảnh tiếp theo",
      },
      room: {
        eyebrow: "PHÒNG NGHỈ DIAMOND SEA",
        capacity_one: "Tối đa {{count}} khách",
        capacity_other: "Tối đa {{count}} khách",
        about: "Về căn phòng này",
        amenities: "Tiện nghi trong phòng",
      },
      price: {
        from: "Giá từ",
        perNight: "/ đêm",
      },
      booking: {
        pricePerNightFrom: "Giá mỗi đêm từ",
        checkIn: "Nhận phòng",
        checkOut: "Trả phòng",
        guests: "Số khách",
        guestOption_one: "{{count}} khách",
        guestOption_other: "{{count}} khách",
        checkAvailability: "Kiểm tra phòng trống",
        confirmationNote: "Phòng và giá được xác nhận ở bước tiếp theo.",
      },
      reviews: {
        sectionLabel: "Đánh giá của khách",
        empty: "Chưa có đánh giá cho hạng phòng này.",
        eyebrow: "TRẢI NGHIỆM CỦA KHÁCH",
        title: "Những kỳ nghỉ được ghi nhớ.",
        ratingLabel: "{{rating}} trên 5 điểm",
        count_one: "{{count}} đánh giá",
        count_other: "{{count}} đánh giá",
        noComment: "Khách không để lại nhận xét.",
        nights_one: "{{count}} đêm",
        nights_other: "{{count}} đêm",
      },
      relatedRooms: {
        eyebrow: "TIẾP TỤC KHÁM PHÁ",
        title: "Khám phá các hạng phòng khác",
      },
      relatedRoomCard: {
        capacity_one: "Tối đa {{count}} khách",
        capacity_other: "Tối đa {{count}} khách",
        perNight: "/ đêm",
        bookRoom: "Đặt phòng",
      },
    },
    booking: {
      hero: {
        eyebrow: "HOÀN TẤT ĐẶT PHÒNG",
        title: "Xác nhận kỳ nghỉ của bạn.",
        description: "Kiểm tra thông tin phòng và điền thông tin liên hệ để tiếp tục đến bước thanh toán.",
      },
      guestInformation: {
        title: "Thông tin khách lưu trú",
        description: "Thông tin này sẽ được dùng để xác nhận và liên hệ về kỳ nghỉ của bạn.",
        fullName: "Họ và tên",
        phone: "Số điện thoại",
        email: "Email",
        bookingForTitle: "Bạn đặt phòng cho ai?",
        stayingGuestLabel: "Người lưu trú",
        self: "Tôi là khách lưu trú",
        someoneElse: "Đặt phòng này cho người khác",
      },
      arrival: {
        title: "Thời gian đến",
        checkInWindow: "Nhận phòng từ 14:00 đến 22:00.",
        checkInWindowWithDate: "Nhận phòng từ 14:00 đến 22:00 ngày {{date}}.",
        estimatedTime: "Giờ đến dự kiến",
        optional: "(không bắt buộc)",
        unspecified: "Chưa xác định",
        localTime: "Giờ địa phương tại Đà Nẵng",
      },
      summary: {
        roomImageAlt: "Phòng {{room}}",
        eyebrow: "KỲ NGHỈ CỦA BẠN",
        capacity: "Sức chứa tối đa {{count}} khách",
        capacity_one: "Sức chứa tối đa {{count}} khách",
        capacity_other: "Sức chứa tối đa {{count}} khách",
        checkIn: "Nhận phòng",
        checkOut: "Trả phòng",
        nights: "{{count}} đêm",
        nights_one: "{{count}} đêm",
        nights_other: "{{count}} đêm",
        priceSummary: "Tóm tắt giá",
        roomSubtotal: "Giá phòng",
        discount: "Ưu đãi",
        total: "Tổng cộng",
        paymentReviewNote: "Bạn sẽ kiểm tra bước thanh toán trước khi hoàn tất.",
      },
      policies: {
        title: "Quy tắc lưu trú",
        description: "Vui lòng xem lại các quy tắc hiện áp dụng cho kỳ nghỉ này.",
        quietHours: "Thời gian yên lặng",
        quietHoursValue: "22:00–06:00",
        pets: "Thú cưng",
        petsValue: "Không được phép",
        confirmation: "Khi tiếp tục, bạn xác nhận đã xem lại các quy tắc lưu trú trên.",
      },
      actions: {
        creating: "Đang tạo đặt phòng…",
        continueToPayment: "Tiếp theo thanh toán",
      },
      states: {
        creatingBooking: "Đang tạo đặt phòng…",
        loadingSummary: "Đang tải thông tin kỳ nghỉ",
      },
      validation: {
        guestNameRequired: "Vui lòng nhập họ tên người đặt phòng",
        phoneRequired: "Vui lòng nhập số điện thoại",
        phoneInvalid: "Số điện thoại không hợp lệ",
        emailRequired: "Vui lòng nhập email",
        emailInvalid: "Email không hợp lệ",
        checkInRequired: "Vui lòng chọn ngày nhận phòng",
        checkOutRequired: "Vui lòng chọn ngày trả phòng",
        checkInInvalid: "Ngày nhận phòng không hợp lệ",
        checkOutInvalid: "Ngày trả phòng không hợp lệ",
        checkOutAfterCheckIn: "Ngày trả phòng phải sau ngày nhận phòng",
      },
      errors: {
        missingRoom: "Thiếu thông tin phòng",
        creationFailed: "Tạo đặt phòng thất bại",
        quoteFailed: "Không thể cập nhật giá cho kỳ nghỉ này",
      },
    },
    payment: {
      hero: {
        eyebrow: "THANH TOÁN ĐẶT PHÒNG",
        title: "Hoàn tất khoản cọc cho kỳ nghỉ của bạn.",
        description: "Kiểm tra lại thông tin kỳ nghỉ và thanh toán khoản cọc để giữ phòng. Trạng thái sẽ được cập nhật sau khi hệ thống xác nhận giao dịch.",
      },
      loading: {
        paymentInfo: "Đang tải thông tin thanh toán...",
        initializing: "Đang khởi tạo thanh toán…",
        creatingQr: "Đang tạo mã QR thanh toán...",
      },
      notice: {
        successTitle: "Thanh toán thành công",
        pendingTitle: "Thanh toán chưa hoàn tất",
        successDescription: "Hệ thống đã xác nhận giao dịch và cập nhật trạng thái thanh toán cho đặt phòng của bạn.",
        pendingDescription: "Giao dịch chưa được xác nhận. Vui lòng thử lại hoặc quay về để tiếp tục sau.",
      },
      actions: {
        viewBooking: "Xem đặt phòng",
        back: "Quay lại",
        close: "Đóng",
        payAmount: "Thanh toán {{amount}} VND",
      },
      errors: {
        missingQr: "Không lấy được mã QR thanh toán",
        createQr: "Không thể khởi tạo mã QR thanh toán. Vui lòng thử lại.",
        createPayment: "Không thể khởi tạo thanh toán. Vui lòng thử lại.",
      },
      details: {
        eyebrow: "THANH TOÁN HÔM NAY",
        depositForBooking: "Khoản cọc cho đặt phòng hiện tại",
        summaryTitle: "Tóm tắt thanh toán",
        totalStay: "Tổng giá trị kỳ nghỉ",
        payToday: "Thanh toán hôm nay",
        remaining: "Phần còn lại",
        depositTerms: "Điều kiện tiền cọc",
        depositDescription: "Khoản cọc {{amount}} VND được thanh toán bằng mã QR. Phần còn lại được thanh toán theo quy trình hiện tại của khách sạn.",
        cancelWindow: "Bạn chỉ được phép hủy trong vòng 24 giờ kể từ thời điểm thanh toán tiền cọc.",
        refundPolicy: "Hủy trong thời hạn trên: hoàn lại 100% tiền cọc.",
        noShowPolicy: "Không đến nhận phòng: mất khoản tiền cọc {{amount}} VND.",
        qrUpdateNote: "Mã QR thanh toán sẽ mở trên trang này. Trạng thái giao dịch được cập nhật tự động sau khi hệ thống ghi nhận thanh toán.",
      },
      qr: {
        title: "Thanh toán bằng mã QR",
        instructions: "Quét mã bằng ứng dụng ngân hàng. Bạn có thể đóng cửa sổ này trong khi hệ thống tiếp tục kiểm tra giao dịch.",
        alt: "Mã QR thanh toán tiền cọc",
        transferContent: "Nội dung chuyển khoản: {{content}}",
        noReload: "Không tải lại trang sau khi thanh toán. Trạng thái được cập nhật tự động khi hệ thống ghi nhận giao dịch.",
      },
      summary: {
        roomImageAlt: "Phòng {{room}}",
        eyebrow: "KỲ NGHỈ CỦA BẠN",
        roomType: "Hạng phòng",
        capacity: "Sức chứa",
        guests: "{{count}} khách",
        guests_one: "{{count}} khách",
        guests_other: "{{count}} khách",
        capacity_one: "Sức chứa tối đa {{count}} khách",
        capacity_other: "Sức chứa tối đa {{count}} khách",
        checkIn: "Nhận phòng",
        checkOut: "Trả phòng",
        nights: "{{count}} đêm",
        nights_one: "{{count}} đêm",
        nights_other: "{{count}} đêm",
        price: "Giá",
        subtotal: "Tạm tính",
        discount: "Giảm giá",
        tax: "Thuế và phí",
        paymentMethod: "Phương thức thanh toán",
        amountPaid: "Đã thanh toán",
        remainingAmount: "Số tiền còn lại",
        guestInfo: "Thông tin khách",
        totalStay: "Tổng kỳ nghỉ",
      },
      legacy: {
        payment: "Thanh toán", total: "Tổng cộng", payAtHotel: "Thanh toán khi nhận phòng",
        priceSummary: "Tóm tắt giá", originalPrice: "Giá gốc", discount: "Ưu đãi", discountHint: "Nhập mã giảm giá nếu bạn có",
        rulesTitle: "Xem lại quy tắc chung", rulesDescription: "Chủ chỗ nghỉ muốn bạn đồng ý với các quy tắc chung này:", quietHours: "Thời gian yên lặng từ {{start}} đến {{end}}", noPets: "Không cho phép thú cưng", rulesConfirmation: "Khi tiếp tục các bước tiếp theo, bạn đồng ý với các quy tắc chung này.",
        arrivalTitle: "Thời gian đến của bạn", arrivalWindow: "Bạn có thể nhận chỗ nghỉ trong khoảng từ 14:00 - 22:00 ngày {{date}}", estimatedArrival: "Thêm thời gian dự kiến đến của bạn", optional: "(không bắt buộc)", select: "Vui lòng chọn", localTime: "Thời gian theo múi giờ Đà Nẵng",
        roomName: "Phòng {{name}}", people: "{{count}} người", people_one: "{{count}} người", people_other: "{{count}} người", roomType: "Hạng phòng",
        resultCount: "Có {{count}} kết quả tìm kiếm phù hợp", resultCount_one: "Có {{count}} kết quả tìm kiếm phù hợp", resultCount_other: "Có {{count}} kết quả tìm kiếm phù hợp", priceAscending: "Giá tăng dần", priceDescending: "Giá giảm dần",
        bookingInfo: "Thông tin đặt phòng", bookingInfoDescription: "Vui lòng kiểm tra thông tin đặt phòng.", fullName: "Họ tên", fullNamePlaceholder: "Nhập họ tên", phone: "Số điện thoại", email: "Email", bookingFor: "Bạn đặt phòng cho ai?", selfGuest: "Tôi là khách lưu trú", otherGuest: "Đặt phòng này là cho người khác",
        bookingDetails: "Chi tiết đặt phòng", guests: "{{count}} khách", guests_one: "{{count}} khách", guests_other: "{{count}} khách", nonRefundable: "Đặt phòng này không được hoàn tiền", customerInfo: "Thông tin khách hàng", guestCount: "Số lượng khách", search: "Tìm phòng",
        steps: { selection: "Bạn chọn", booking: "Đặt phòng", payment: "Thanh toán" },
        depositNoticeTitle: "Bạn cần thanh toán số tiền cọc phòng", depositNoticeDescription: "Bạn cần thanh toán số tiền cọc phòng là {{amount}} VND. Phần còn lại sẽ được thanh toán trực tiếp tại khách sạn.", note: "Lưu ý", cancelWithin: "Bạn chỉ được phép huỷ trong vòng 24 giờ kể từ thời điểm thanh toán cọc phòng.", cancelBeforeLabel: "Huỷ trước 24h:", fullRefund: "hoàn lại 100% tiền cọc", noShowLabel: "Không đến nhận phòng:", depositForfeited: "mất tiền cọc ({{amount}} VND)",
      },
    },
    myBookings: {
      hero: {
        eyebrow: "KỲ NGHỈ CỦA BẠN",
        title: "Đặt phòng của tôi",
        description: "Theo dõi những kỳ nghỉ sắp tới và lịch sử lưu trú tại Diamond Sea.",
      },
      tabs: { upcoming: "Sắp tới", done: "Hoàn tất", cancelled: "Đã hủy" },
      status: {
        PENDING: "Đang chờ xác nhận",
        CONFIRMED: "Đã xác nhận",
        CANCELLED: "Đã hủy",
        CHECKED_IN: "Đang lưu trú",
        CHECKED_OUT: "Đã hoàn tất",
      },
      card: {
        roomImageAlt: "Phòng {{room}} tại Diamond Sea",
        roomAndCode: "Phòng {{room}} · Mã đặt phòng {{code}}",
        checkIn: "NHẬN PHÒNG",
        checkOut: "TRẢ PHÒNG",
        staySummary: "{{nights}} đêm · Sức chứa tối đa {{guests}} khách",
        total: "Tổng giá trị",
        discount: "Ưu đãi −{{amount}} VND",
        remaining: "Còn lại {{amount}} VND",
      },
      actions: {
        retry: "Thử lại",
        exploreRooms: "Khám phá phòng",
        viewDetails: "Xem chi tiết",
        cancelBooking: "Hủy đặt phòng",
        bookAgain: "Đặt lại",
        writeReview: "Viết đánh giá",
        viewReview: "Xem đánh giá",
      },
      states: {
        loadErrorTitle: "Không thể tải đặt phòng",
        loadErrorDescription: "Thông tin kỳ nghỉ hiện chưa thể truy cập. Vui lòng thử lại.",
      },
      empty: {
        upcoming: { title: "Bạn chưa có kỳ nghỉ nào sắp tới.", description: "Khám phá những căn phòng phù hợp cho kỳ nghỉ tiếp theo tại Diamond Sea." },
        done: { title: "Chưa có kỳ nghỉ đã hoàn tất.", description: "Lịch sử lưu trú của bạn sẽ xuất hiện tại đây sau khi trả phòng." },
        cancelled: { title: "Bạn chưa có đặt phòng đã hủy.", description: "Các đặt phòng đã hủy sẽ được lưu tại đây để bạn dễ dàng theo dõi." },
      },
      cancelDialog: {
        title: "Xác nhận hủy đặt phòng",
        closeAria: "Đóng hộp thoại hủy đặt phòng",
        confirmation: "Bạn có chắc muốn hủy đặt phòng này?",
        description: "Vui lòng cho chúng tôi biết lý do để khách sạn có thể ghi nhận yêu cầu của bạn.",
        reasonLabel: "Lý do hủy phòng",
        reasonRequired: "Vui lòng nhập lý do hủy phòng.",
        reasonPlaceholder: "Nhập lý do hủy phòng của bạn…",
        keepBooking: "Giữ đặt phòng",
        cancelling: "Đang hủy…",
        confirmCancel: "Xác nhận hủy",
      },
      messages: {
        cancelSuccess: "Hủy đặt phòng thành công",
        cancelError: "Không thể hủy đặt phòng lúc này. Vui lòng thử lại.",
      },
      aria: {
        bookingCategories: "Danh mục đặt phòng",
        loadingBookings: "Đang tải danh sách đặt phòng",
      },
    },
    bookingDetail: {
      hero: { eyebrow: "KỲ NGHỈ CỦA BẠN", bookingCode: "Mã đặt phòng: {{code}}" },
      status: {
        PENDING: "Đang chờ xác nhận",
        CONFIRMED: "Đã xác nhận",
        CANCELLED: "Đã hủy",
        CHECKED_IN: "Đang lưu trú",
        CHECKED_OUT: "Đã hoàn tất",
      },
      states: {
        loading: "Đang tải thông tin kỳ nghỉ…",
        loadErrorTitle: "Không thể tải đặt phòng",
        loadErrorDescription: "Đặt phòng không tồn tại hoặc hiện chưa thể truy cập.",
      },
      stay: {
        roomImageAlt: "Phòng {{room}}",
        room: "Phòng {{room}}",
        checkIn: "NHẬN PHÒNG",
        checkOut: "TRẢ PHÒNG",
        nights: "{{count}} đêm",
        nights_one: "{{count}} đêm",
        nights_other: "{{count}} đêm",
        capacity: "Sức chứa tối đa {{count}} khách",
        capacity_one: "Sức chứa tối đa {{count}} khách",
        capacity_other: "Sức chứa tối đa {{count}} khách",
      },
      information: {
        title: "Thông tin lưu trú",
        description: "Thông tin liên hệ được cung cấp cho đặt phòng này.",
        guest: "Khách lưu trú",
        phone: "Số điện thoại",
        email: "Email",
        arrivalTime: "Giờ đến dự kiến",
      },
      payment: {
        title: "Tóm tắt thanh toán",
        roomAmount: "Tiền phòng",
        discount: "Ưu đãi",
        discountWithCode: "Ưu đãi ({{code}})",
        total: "Tổng giá trị",
        paid: "Đã thanh toán",
        remaining: "Còn lại",
        note: "Số tiền hiển thị theo thông tin thanh toán hiện tại của đặt phòng.",
      },
      policies: {
        title: "Chính sách đặt phòng",
        refundable: "Đặt phòng này được ghi nhận là có thể hoàn tiền. Điều kiện và số tiền hoàn thực tế được áp dụng theo xác nhận của khách sạn.",
        nonRefundable: "Đặt phòng này được ghi nhận là không hoàn tiền. Vui lòng liên hệ khách sạn nếu bạn cần hỗ trợ.",
      },
      management: { title: "Quản lý đặt phòng", description: "Các thao tác hiện có cho đặt phòng này." },
      actions: {
        backToBookings: "Trở về đặt phòng của tôi",
        myBookings: "Đặt phòng của tôi",
        cancelBooking: "Hủy đặt phòng",
        bookAgain: "Đặt lại phòng",
        writeReview: "Viết đánh giá",
        viewReview: "Xem đánh giá",
      },
      timeline: { booked: "Phòng đã đặt", checkedIn: "Đã check-in", checkedOut: "Đã check-out", review: "Đánh giá", cancelled: "Hủy đặt phòng" },
      countdown: {
        upcoming: "Còn {{count}} ngày nữa cho kỳ nghỉ sắp tới của bạn!",
        today: "Chúc bạn có kỳ nghỉ tuyệt vời!",
        imageAlt: "Minh họa kỳ nghỉ sắp tới",
      },
      cancelDialog: {
        title: "Xác nhận hủy đặt phòng",
        closeAria: "Đóng hộp thoại hủy đặt phòng",
        confirmation: "Bạn có chắc muốn hủy đặt phòng này?",
        description: "Vui lòng cho chúng tôi biết lý do để khách sạn có thể ghi nhận yêu cầu của bạn.",
        reasonLabel: "Lý do hủy phòng",
        reasonRequired: "Vui lòng nhập lý do hủy phòng.",
        reasonPlaceholder: "Nhập lý do hủy phòng của bạn…",
        keepBooking: "Giữ đặt phòng",
        cancelling: "Đang hủy…",
        confirmCancel: "Xác nhận hủy",
      },
      messages: {
        cancelSuccess: "Hủy đặt phòng thành công",
        cancelError: "Không thể hủy đặt phòng lúc này. Vui lòng thử lại.",
      },
    },
    profile: {
      hero: {
        eyebrow: "TÀI KHOẢN CỦA BẠN",
        title: "Hồ sơ của tôi",
        description: "Quản lý thông tin cá nhân được sử dụng cho các kỳ nghỉ tại Diamond Sea.",
      },
      tabs: { information: "Thông tin cá nhân", security: "Bảo mật tài khoản" },
      information: {
        title: "Thông tin cá nhân",
        description: "Thông tin liên hệ giúp khách sạn chuẩn bị và hỗ trợ kỳ nghỉ của bạn.",
      },
      security: {
        title: "Bảo mật tài khoản",
        description: "Cập nhật mật khẩu định kỳ để bảo vệ thông tin và các đặt phòng của bạn.",
      },
      fields: {
        fullName: "Họ và tên",
        email: "Email",
        phone: "Số điện thoại",
        currentPassword: "Mật khẩu hiện tại",
        newPassword: "Mật khẩu mới",
        confirmPassword: "Xác nhận mật khẩu mới",
        notUpdated: "Chưa cập nhật",
      },
      actions: {
        retry: "Thử lại",
        edit: "Chỉnh sửa thông tin",
        cancel: "Hủy",
        save: "Lưu thay đổi",
        saving: "Đang lưu…",
        changePassword: "Đổi mật khẩu",
        updating: "Đang cập nhật…",
      },
      states: {
        loadErrorTitle: "Không thể tải hồ sơ",
        loadErrorDescription: "Thông tin tài khoản hiện chưa thể truy cập. Vui lòng thử lại.",
      },
      validation: {
        fullNameRequired: "Họ và tên không được để trống.",
        emailRequired: "Email không được để trống.",
        emailInvalid: "Email không hợp lệ.",
        currentPasswordRequired: "Vui lòng nhập mật khẩu hiện tại.",
        newPasswordRequired: "Vui lòng nhập mật khẩu mới.",
        newPasswordLength: "Mật khẩu mới phải từ 6 ký tự trở lên.",
        confirmPasswordRequired: "Vui lòng xác nhận mật khẩu.",
        passwordMismatch: "Mật khẩu xác nhận không khớp.",
      },
      messages: {
        updateSuccess: "Thông tin của bạn đã được cập nhật.",
        updateError: "Không thể cập nhật thông tin lúc này. Vui lòng thử lại.",
        passwordSuccess: "Mật khẩu đã được cập nhật.",
        passwordError: "Không thể đổi mật khẩu lúc này. Vui lòng kiểm tra lại và thử lại.",
      },
      aria: { loading: "Đang tải hồ sơ", content: "Nội dung hồ sơ" },
    },
    reviews: {
      list: {
        eyebrow: "TRẢI NGHIỆM CỦA BẠN",
        title: "Đánh giá của tôi",
        description: "Nhìn lại và chia sẻ cảm nhận về những kỳ nghỉ của bạn tại Diamond Sea.",
      },
      detail: {
        eyebrow: "TRẢI NGHIỆM CỦA BẠN",
        createTitle: "Chia sẻ cảm nhận về kỳ nghỉ của bạn.",
        viewTitle: "Đánh giá kỳ nghỉ tại Diamond Sea",
        createDescription: "Phản hồi chân thành của bạn giúp Diamond Sea chăm chút hơn cho từng trải nghiệm lưu trú.",
        viewDescription: "Những cảm nhận bạn đã chia sẻ sau kỳ nghỉ tại Diamond Sea.",
      },
      stay: {
        aria: "Kỳ nghỉ được đánh giá",
        roomImageAlt: "Phòng {{room}} tại Diamond Sea",
        roomAndCode: "Phòng {{room}} · Mã đặt phòng {{code}}",
        nights: "{{count}} đêm",
        nights_one: "{{count}} đêm",
        nights_other: "{{count}} đêm",
        capacity: "Sức chứa tối đa {{count}} khách",
        capacity_one: "Sức chứa tối đa {{count}} khách",
        capacity_other: "Sức chứa tối đa {{count}} khách",
        completedSummary: "{{count}} đêm · Kỳ nghỉ đã hoàn tất",
        completedSummary_one: "{{count}} đêm · Kỳ nghỉ đã hoàn tất",
        completedSummary_other: "{{count}} đêm · Kỳ nghỉ đã hoàn tất",
      },
      rating: {
        aria: "{{value}} trên 5 điểm",
        criterionAria: "{{label}}: {{value}} trên 5 điểm",
      },
      overall: {
        createTitle: "Bạn đánh giá kỳ nghỉ này thế nào?",
        viewTitle: "Đánh giá tổng quan",
        createDescription: "Chọn mức điểm phản ánh cảm nhận chung của bạn.",
        viewDescription: "Cảm nhận chung của bạn về kỳ nghỉ tại Diamond Sea.",
      },
      criteria: {
        title: "Đánh giá chi tiết",
        createDescription: "Chia sẻ cảm nhận của bạn ở từng khía cạnh của kỳ nghỉ.",
        viewDescription: "Điểm bạn đã dành cho từng khía cạnh của kỳ nghỉ.",
        amenities: "Tiện nghi",
        cleanliness: "Vệ sinh",
        comfort: "Thoải mái",
        location: "Địa điểm",
        valueForMoney: "Đáng giá tiền",
        hygiene: "Sạch sẽ",
      },
      comment: {
        createTitle: "Chia sẻ thêm về trải nghiệm của bạn",
        viewTitle: "Nhận xét của bạn",
        description: "Những điều bạn yêu thích hoặc điều Diamond Sea có thể cải thiện.",
        placeholder: "Hãy chia sẻ trải nghiệm của bạn tại khách sạn.",
        aria: "Nhận xét về kỳ nghỉ",
        noComment: "Bạn chưa để lại nhận xét bằng văn bản cho kỳ nghỉ này.",
        reviewDate: "Đánh giá ngày {{date}}",
      },
      actions: {
        retry: "Thử lại",
        exploreRooms: "Khám phá phòng",
        viewDetails: "Xem chi tiết",
        myReviews: "Đánh giá của tôi",
        cancel: "Hủy",
        submit: "Gửi đánh giá",
        submitting: "Đang gửi…",
      },
      states: {
        loadErrorTitle: "Không thể tải đánh giá",
        loadErrorDescription: "Những chia sẻ của bạn hiện chưa thể truy cập. Vui lòng thử lại.",
        emptyTitle: "Chưa có đánh giá nào",
        emptyDescription: "Cảm nhận về kỳ nghỉ đầu tiên của bạn sẽ được lưu lại tại đây sau khi hoàn tất lưu trú.",
        stayLoadError: "Không thể tải thông tin kỳ nghỉ",
        reviewNotFound: "Không tìm thấy đánh giá này",
        unavailableDescription: "Nội dung không tồn tại hoặc hiện không thể truy cập.",
      },
      validation: { ratingRequired: "Vui lòng chọn mức đánh giá." },
      messages: { submitError: "Không thể gửi đánh giá lúc này. Vui lòng thử lại." },
      aria: { loadingList: "Đang tải danh sách đánh giá", loadingDetail: "Đang tải đánh giá" },
    },
    notFound: {
      eyebrow: "DIAMOND SEA ĐÀ NẴNG",
      title: "Không tìm thấy trang",
      description: "Trang bạn đang tìm có thể đã được di chuyển, xóa hoặc hiện không khả dụng. Hãy trở về trang chủ hoặc tiếp tục khám phá các hạng phòng của Diamond Sea.",
      actions: { home: "Về trang chủ", rooms: "Khám phá phòng" },
    },
    accountNavigation: {
      aria: "Điều hướng tài khoản khách hàng",
      title: "Tài khoản khách hàng",
      guest: "Khách hàng",
      profile: "Hồ sơ của tôi",
      bookings: "Lịch sử đặt phòng",
      reviews: "Đánh giá",
      logout: "Đăng xuất",
    },
    shared: {
      roomCard: {
        available: "Còn phòng",
        soldOut: "Hết phòng",
        capacity: "{{count}} người",
        capacity_one: "{{count}} người",
        capacity_other: "{{count}} người",
        bookRoom: "Đặt phòng",
      },
      bookingStepper: {
        aria: "Tiến trình đặt phòng",
        selection: "Bạn chọn",
        booking: "Đặt phòng",
        payment: "Thanh toán",
      },
      booking: {
        noPhone: "Chưa có số điện thoại",
        noEmail: "Chưa có email",
        checkIn: "Nhận phòng",
        checkOut: "Trả phòng",
        nights: "{{count}} đêm",
        nights_one: "{{count}} đêm",
        nights_other: "{{count}} đêm",
        back: "Trở lại",
        bookingCode: "MÃ ĐẶT PHÒNG",
        status: {
          PENDING: "Đang chờ",
          CONFIRMED: "Sắp nhận phòng",
          CHECKED_IN: "Đã nhận phòng",
          CHECKED_OUT: "Đã hoàn thành",
          CANCELLED: "Đã hủy",
        },
      },
    },
  },
  admin: {
    notFound: {
      title: "Không tìm thấy trang",
      description: "Địa chỉ này không tồn tại hoặc bạn không thể truy cập từ không gian vận hành hiện tại.",
      actions: { dashboard: "Về trang tổng quan" },
    },
  },
  navigation: {
    aria: {
      adminNavigation: "Điều hướng quản trị",
      openNavigation: "Mở điều hướng quản trị",
      openAccount: "Mở menu tài khoản của {{name}}",
      accountOptions: "Tùy chọn tài khoản",
    },
    groups: {
      overview: "TỔNG QUAN",
      operations: "VẬN HÀNH",
      business: "KINH DOANH",
      experience: "TRẢI NGHIỆM",
      system: "HỆ THỐNG",
    },
    items: {
      dashboard: "Tổng quan",
      bookings: "Quản lý đặt phòng",
      frontDesk: "Lễ tân",
      rooms: "Quản lý phòng",
      roomTypes: "Quản lý loại phòng",
      housekeeping: "Buồng phòng",
      schedules: "Quản lý lịch làm",
      promotions: "Quản lý khuyến mãi",
      services: "Quản lý dịch vụ",
      reviews: "Quản lý đánh giá",
      staff: "Quản lý nhân viên",
    },
    account: "Tài khoản của tôi",
    language: "Ngôn ngữ",
    logout: "Đăng xuất",
    product: "VẬN HÀNH KHÁCH SẠN",
  },
  dashboard: {
    title: "Tổng quan vận hành",
    subtitle: "Theo dõi nhanh tình hình kinh doanh và hoạt động khách sạn.",

    todayBookings: "Booking hôm nay",
    availableRooms: "Phòng còn trống",
    cleanRooms: "Phòng sạch",
    weekRevenue: "Doanh thu tuần này",
    newCustomers: "Khách hàng mới",

    noPreviousData: "Chưa có dữ liệu kỳ trước",

    todayActivity: "Hoạt động hôm nay",
    todayActivitySubtitle: "Khách đến và rời khách sạn trong ngày.",
    todayCheckIns: "Check-in hôm nay",
    todayCheckOuts: "Check-out hôm nay",

    reportsAndRevenue: "Báo cáo & doanh thu",
    reportsAndRevenueSubtitle: "Theo dõi hiệu suất kinh doanh của khách sạn.",
    totalRevenue: "Tổng doanh thu",
    occupancyRate: "Tỉ lệ lấp đầy",

    comparisons: {
      yesterday: "so với hôm qua",
      previousWeek: "so với tuần trước",
      previousMonth: "so với tháng trước",
    },

    activity: {
      noCheckIns: "Không có khách check-in hôm nay.",
      noCheckOuts: "Không có khách check-out hôm nay.",
      unknownGuest: "Chưa có tên khách",
    },

    revenue: {
      monthlyTitle: "Doanh thu theo tháng",
      noData: "Không có dữ liệu doanh thu",
      chartAriaLabel: "Biểu đồ doanh thu theo tháng",
      seriesLabel: "Doanh thu",
    },

    bookingStats: {
      title: "Thống kê booking",
      total: "Tổng booking",
      successful: "Booking thành công",
      cancelled: "Booking bị hủy",
      cancellationRate: "Tỷ lệ hủy",
      noData: "Không có dữ liệu",
    },

    operations: {
      actions: {
        checkIn: "Nhận phòng",
        checkOut: "Trả phòng",
      },
      status: {
        PENDING: "Đang chờ",
        CONFIRMED: "Đã xác nhận",
        CHECKED_IN: "Đã nhận phòng",
        CHECKED_OUT: "Đã trả phòng",
        CANCELLED: "Đã hủy",
      },
      actionFor: "{{action}} cho {{target}}",
      roomTarget: "phòng {{room}}",
      unknownRoom: "chưa xác định",
    },
  },

  bookings: {
    title: "Quản lý đặt phòng",
    subtitle: "Theo dõi, tìm kiếm và xử lý các đặt phòng của khách.",
    search: "Tìm theo mã đặt phòng, tên khách hàng",
    create: "Tạo đặt phòng",
    processingPayment: "Đang xử lý thanh toán, vui lòng chờ...",

    status: {
      PENDING: "Chờ xác nhận",
      CONFIRMED: "Đã xác nhận",
      CANCELLED: "Đã hủy",
      CHECKED_IN: "Đang ở",
      CHECKED_OUT: "Đã trả phòng",
    },

    actions: {
      checkIn: "Nhận phòng",
      checkOut: "Trả phòng",
      cancel: "Hủy đặt phòng",
      continuePayment: "Tiếp tục thanh toán",
      checkingIn: "Đang nhận phòng…",
      checkingOut: "Đang trả phòng…",
      tooEarly: "Chưa đến giờ",
      roomInspectionInProgress: "Phòng đang được kiểm tra",
      inspectRoom: "Kiểm tra phòng",
      completed: "Hoàn tất",
      cancelled: "Đã hủy phòng",
    },

    columns: {
      code: "Mã",
      guest: "Khách",
      phone: "Số điện thoại",
      room: "Phòng",
      checkIn: "Nhận phòng",
      checkOut: "Trả phòng",
      nights: "Đêm",
      status: "Trạng thái",
    },

    list: {
      loadError: "Không thể tải danh sách đặt phòng.",
      retryHint: "Vui lòng thử lại sau.",
      empty: "Chưa có đặt phòng phù hợp.",
      emptyHint: "Thử thay đổi từ khóa tìm kiếm hoặc tạo đặt phòng mới.",
    },

    createDialog: {
      title: "Tạo đặt phòng",
      subtitle: "Nhập thông tin khách và chọn phòng phù hợp.",

      customerInformation: "Thông tin khách hàng",
      customerName: "Tên khách hàng",
      phone: "Số điện thoại",

      stayInformation: "Thông tin lưu trú",
      checkInDate: "Ngày đến",
      checkOutDate: "Ngày đi",
      paymentMethod: "Phương thức thanh toán",

      roomType: "Loại phòng",
      allRoomTypes: "Toàn bộ loại phòng",
      room: "Chọn phòng",
      chooseAvailableRoom: "Chọn phòng trống",

      promotionCode: "Mã khuyến mãi",
      promotionPlaceholder: "Nhập mã khuyến mãi",
      applyPromotion: "Áp dụng",

      noAvailableRooms: "Không có phòng trống thời điểm này",
      priceSummary: "TÓM TẮT GIÁ",
      unitPrice: "Đơn giá:",

      create: "Tạo đặt phòng",
    },

    detail: {
      eyebrow: "ĐẶT PHÒNG",

      tabs: {
        information: "Thông tin",
        services: "Dịch vụ",
        housekeeping: "Buồng phòng",
        payment: "Thanh toán",
      },

      guestInformation: "THÔNG TIN KHÁCH",
      guest: "Khách",
      phone: "Điện thoại",
      email: "Email",
      bookedFor: "Đặt hộ / Người ở thực tế",
      no: "Không",
      yes: "Có",

      stayInformation: "THÔNG TIN LƯU TRÚ",
      checkIn: "Nhận phòng",
      checkOut: "Trả phòng",
      nights: "Số đêm",
      expectedArrivalTime: "Giờ đến dự kiến",
      status: "Trạng thái",

      roomAssignment: "PHÂN PHÒNG",
      assignedRoom: "Phòng được gán",

      overdue: "Quá hạn",

      hotelServices: "Dịch vụ khách sạn",
      serviceTab: "Dịch vụ",
      incidentalsTab: "Phí phát sinh",
      bookingServices: "Dịch vụ của booking",
      noServices: "Chưa có dịch vụ.",
      noServicesHint: "Chọn dịch vụ bên cạnh để thêm vào booking.",
      loadingServices: "Đang tải dịch vụ...",
      added: "Đã thêm",
      noMatchingServices: "Chưa có dịch vụ phù hợp",
      servicesEmptyHint: "Danh sách sẽ hiển thị khi có dữ liệu.",
      quantity: "Số lượng: {{count}}",

      housekeepingWork: "Công việc buồng phòng",
      noHousekeepingTasks: "Không có công việc buồng phòng",
      chooseTask: "Chọn một công việc",
      chooseTaskHint: "Thông tin chi tiết sẽ hiển thị tại đây.",
      addTask: "Thêm mới",
      loadingHousekeeping: "Đang tải dữ liệu...",
      housekeepingTaskDetail: "Chi tiết công việc",
      housekeepingTaskDetailHint: "Theo dõi trạng thái, phân công và ghi chú vận hành.",
      taskType: "Loại công việc",
      assignee: "Nhân viên phụ trách",
      unassigned: "Chưa phân công",
      workDate: "Ngày làm việc",
      housekeepingNotes: "Ghi chú buồng phòng",
      housekeepingNotesPlaceholder: "Nhập ghi chú buồng phòng...",

      paymentHistory: "Lịch sử thanh toán",
      loadingPayment: "Đang tải thông tin thanh toán...",
      noTransactions: "Chưa có giao dịch",
      noTransactionsHint: "Lịch sử thanh toán sẽ xuất hiện tại đây.",
      transfer: "Chuyển khoản",
      deposit: "Đặt cọc",
      success: "Thành công",

      paymentSummary: "Tổng thanh toán",
      roomCharge: "Tiền phòng",
      serviceCharge: "Dịch vụ",
      subtotal: "Tạm tính",
      discount: "Giảm giá",
      tax: "Thuế",
      total: "Tổng cộng",
      paid: "Đã thanh toán",
      remaining: "Còn lại",
      paymentMethod: "Phương thức thanh toán",
      pay: "Thanh toán",
      nightCount: "{{count}} đêm",
    },

    paymentMethods: {
      CASH: "Tiền mặt",
      TRANSFER: "Chuyển khoản",
      BANK_TRANSFER: "Thanh toán online",
      E_WALLET: "Ví điện tử",
      CARD: "Thẻ",
      ONLINE: "Thanh toán online",
    },

    paymentStatus: {
      PENDING: "Đang chờ",
      SUCCESS: "Thành công",
      FAILED: "Thất bại",
      REFUNDED: "Đã hoàn tiền",
    },

    paymentTypes: {
      DEPOSIT: "Đặt cọc",
      ROOM_PAYMENT: "Thanh toán tiền phòng",
      SERVICE_PAYMENT: "Thanh toán dịch vụ",
      REFUND: "Hoàn tiền",
    },

    housekeepingTypes: {
      CLEANING: "Dọn phòng",
      INSPECTION: "Kiểm tra phòng",
    },

    housekeepingStatus: {
      PENDING: "Chờ thực hiện",
      IN_PROGRESS: "Đang kiểm tra",
      COMPLETED: "Hoàn thành",
    },

    roomPicker: {
      title: "Chọn phòng trống",
      subtitle: "Chọn một phòng phù hợp với thời gian lưu trú đã nhập.",
      search: "Tìm theo tên phòng",
      columns: {
        room: "Phòng",
        roomType: "Loại phòng",
        capacity: "Sức chứa",
      },
      loading: "Đang tải phòng trống...",
      empty: "Không có phòng phù hợp",
      emptyHint: "Thử thay đổi ngày lưu trú hoặc loại phòng.",
      guests: "{{count}} khách",
      select: "Chọn phòng",
    },

    cancelDialog: {
      title: "Xác nhận hủy đặt phòng",
      description: "Vui lòng cho chúng tôi biết lý do bạn muốn hủy đặt phòng này.",
      reason: "Lý do hủy phòng",
      reasonPlaceholder: "Nhập lý do hủy phòng của bạn…",
      confirm: "Xác nhận hủy",
      keep: "Giữ đặt phòng",
    },

    checkInDialog: {
      title: "Xác nhận nhận phòng",
      bookingInformation: "Thông tin đặt phòng",
      customer: "Khách hàng",
      paymentInformation: "Thông tin thanh toán",
      confirmPayment: "Xác nhận thanh toán",
    },

    qrDialog: {
      title: "Thanh toán bằng mã QR",
      successTitle: "Thanh toán thành công",
      description: "Quét mã bằng ứng dụng ngân hàng để hoàn tất thanh toán.",
      successDescription: "Giao dịch đã được xác nhận và cập nhật vào hệ thống.",
      confirmed: "Đã xác nhận thanh toán",
      creating: "Đang tạo mã QR thanh toán...",
      imageAlt: "Mã QR thanh toán ngân hàng",
      transferContent: "Nội dung chuyển khoản",
      instructions: "Quét mã QR bằng ứng dụng ngân hàng. Hệ thống sẽ tự động cập nhật trạng thái khi giao dịch được xác nhận.",
      confirming: "Đang xác nhận...",
      markSuccessful: "Đánh dấu thành công",
    },

    currency: {
      code: "VND",
      symbol: "đ",
      amount: "{{value}} VND",
      perNight: "{{value}} VND/đêm",
    },

    validation: {
      roomRequired: "Vui lòng chọn phòng",
      checkInRequired: "Vui lòng chọn ngày nhận phòng",
      checkOutRequired: "Vui lòng chọn ngày trả phòng",
      checkOutAfterCheckIn: "Ngày trả phòng phải sau ngày nhận phòng",
      missingRoomOrDates: "Thiếu thông tin phòng hoặc ngày",
      validRoomAndDatesRequired: "Vui lòng chọn phòng và ngày nhận trả phòng hợp lệ",
      missingRoom: "Thiếu thông tin phòng",
      cancelReasonRequired: "Vui lòng nhập lý do hủy phòng.",
    },

    messages: {
      cashPaymentSuccess: "Thanh toán tiền mặt thành công",
      bookingAndPaymentSuccess: "Đặt phòng và thanh toán thành công",
      bookingCreatedContinuePayment: "Đặt phòng thành công, tiếp tục thanh toán để xác nhận đặt phòng",
      createBookingError: "Tạo đặt phòng thất bại",
      promotionApplied: "Áp dụng mã {{code}} thành công, giảm {{discount}}₫",
      promotionNotApplicable: "Mã giảm giá không áp dụng cho đơn này",
      promotionApplyError: "Không áp dụng được mã khuyến mãi. Vui lòng kiểm tra lại.",
      createBookingRetryError: "Tạo đặt phòng thất bại, vui lòng thử lại",
      createPaymentError: "Tạo thanh toán thất bại",
      paymentSuccess: "Thanh toán thành công",
      completePaymentError: "Không thể hoàn tất thanh toán",
      cancelPaymentSuccess: "Hủy thanh toán thành công",
      cancelPaymentError: "Hủy thanh toán thất bại",
      createOnlinePaymentError: "Tạo thanh toán online thất bại",
      changeRoomSuccess: "Thay đổi phòng thành công",
      changeRoomError: "Thay đổi phòng thất bại",
      checkInSuccess: "Nhận phòng thành công",
      checkInError: "Nhận phòng thất bại",
      checkOutSuccess: "Trả phòng thành công",
      checkOutError: "Trả phòng thất bại",
      cancelBookingSuccess: "Hủy phòng thành công",
      cancelBookingError: "Hủy phòng thất bại",
      paymentRequiredBeforeCheckOut: "Yêu cầu thanh toán toàn bộ hóa đơn trước khi trả phòng",
      paymentRequiredBeforeCheckIn: "Yêu cầu thanh toán tiền phòng trước khi nhận phòng",
      roomInspectionComplete: "Phòng đã được kiểm tra xong",
      housekeepingTaskCreated: "Tạo nhiệm vụ dọn phòng thành công",
      noHousekeepingStaffOnShift: "Không có nhân viên dọn phòng đang trong ca làm!",
      createHousekeepingTaskError: "Tạo nhiệm vụ buồng phòng thất bại",
    },
  },

  rooms: {
    title: "Quản lý phòng",
    subtitle: "Theo dõi trạng thái và thông tin phòng trong khách sạn.",
    search: "Tìm theo số phòng",
    create: "Thêm phòng",

    loadError: "Không thể tải danh sách phòng.",
    empty: "Không tìm thấy phòng.",
    emptyHint: "Thử thay đổi từ khóa hoặc loại phòng.",

    allRoomTypes: "Tất cả",
    guests: "{{count}} người",
    currency: "đ",
    perNight: "/ đêm",
    pricePerNight: "VND / đêm",

    fields: {
      status: "TRẠNG THÁI",
    },

    aria: {
      roomTypeTabs: "Bộ lọc theo loại phòng",
      roomImage: "Hình ảnh phòng {{name}}",
      roomActions: "Thao tác phòng {{name}}",
      updateRoomStatus: "Cập nhật trạng thái phòng {{name}}",
    },

    status: {
      VACANT_CLEAN: "Trống · Sạch",
      VACANT_DIRTY: "Trống · Cần dọn",
      OCCUPIED_CLEAN: "Đang ở · Sạch",
      OCCUPIED_DIRTY: "Đang ở · Cần dọn",
      OUT_OF_SERVICE: "Bảo trì",
    },

    actions: {
      edit: "Chỉnh sửa",
      delete: "Xóa phòng",
    },

    createDialog: {
      title: "Tạo phòng",
      subtitle: "Nhập thông tin phòng mới.",
      information: "THÔNG TIN PHÒNG",
      roomName: "Tên / số phòng",
      roomNamePlaceholder: "Nhập tên phòng",
      roomType: "Loại phòng",
      chooseRoomType: "Chọn loại phòng",
      create: "Tạo phòng",
    },

    editDialog: {
      title: "Chỉnh sửa phòng",
      information: "THÔNG TIN PHÒNG",
      roomName: "Tên / số phòng",
      roomType: "Loại phòng",

      roomTypeInformation: "THÔNG TIN LOẠI PHÒNG",
      price: "Giá",
      capacity: "Sức chứa",
      amenities: "Tiện nghi",
    },

    states: {
      loadingRoomInformation: "Đang tải thông tin phòng…",
      noAmenities: "Chưa có thông tin tiện nghi.",
    },

    validation: {
      roomNameRequired: "Tên phòng là bắt buộc.",
      roomTypeRequired: "Loại phòng là bắt buộc.",
    },

    notifications: {
      statusUpdateSuccess: "Cập nhật trạng thái phòng thành công",
      statusUpdateError: "Không thể cập nhật trạng thái phòng",
      createSuccess: "Tạo phòng mới thành công",
      updateSuccess: "Cập nhật phòng thành công",
      deleteSuccess: "Xóa phòng thành công",
      genericError: "Có lỗi xảy ra",
    },

  },

  roomTypes: {
    title: "Quản lý loại phòng",
    subtitle: "Quản lý danh mục, tiện nghi và giá bán của từng loại phòng.",
    search: "Tìm theo tên loại phòng",
    create: "Thêm loại phòng",
    guests: "{{count}} người",
    currency: "VND",

    columns: {
      id: "Mã",
      name: "Tên loại phòng",
      capacity: "Sức chứa",
      pricePerNight: "Giá / đêm",
      actions: "Thao tác",
    },

    actions: {
      edit: "Chỉnh sửa",
      delete: "Xóa loại phòng",
    },

    aria: {
      actions: "Thao tác loại phòng",
      rowActions: "Thao tác loại phòng {{name}}",
      imageAlt: "Ảnh loại phòng {{index}}",
      removeImage: "Xóa ảnh {{index}}",
    },

    states: {
      loadError: "Không thể tải danh sách loại phòng.",
      empty: "Không tìm thấy loại phòng.",
      emptyHint: "Thử thay đổi từ khóa tìm kiếm.",
      loadingDetails: "Đang tải thông tin loại phòng…",
      amenitiesLoadError: "Không thể tải danh sách tiện nghi.",
    },

    createDialog: {
      title: "Thêm loại phòng",

      generalInformation: "THÔNG TIN CHUNG",
      name: "Tên loại phòng",
      guestCount: "Số người",
      price: "Giá tiền",
      description: "Mô tả",

      servicesAndAmenities: "DỊCH VỤ & TIỆN NGHI",
      amenitiesHint: "Chọn các tiện nghi áp dụng cho loại phòng.",
      chooseServicesAndAmenities: "Chọn dịch vụ và tiện nghi",

      images: "HÌNH ẢNH",
      addImage: "Thêm ảnh",

      create: "Thêm loại phòng",
    },

    editDialog: {
      title: "Chỉnh sửa loại phòng",
      code: "Mã {{code}}",

      generalInformation: "THÔNG TIN CHUNG",
      name: "Tên loại phòng",
      guestCount: "Số người",
      price: "Giá tiền",
      description: "Mô tả",

      servicesAndAmenities: "DỊCH VỤ & TIỆN NGHI",
      amenitiesHint: "Chọn các tiện nghi áp dụng cho loại phòng.",
      chooseServicesAndAmenities: "Chọn dịch vụ và tiện nghi",

      images: "HÌNH ẢNH",
      addImage: "Thêm ảnh",
    },

    deleteDialog: {
      title: "Xóa loại phòng {{name}}?",
      description:
        "Bạn có chắc muốn tiếp tục? Hệ thống sẽ giữ nguyên các quy tắc và ràng buộc xóa hiện có.",
    },

    validation: {
      invalidPrice: "Giá phòng là bắt buộc và phải là một số hợp lệ.",
      capacityRequired: "Số người là bắt buộc.",
      invalidCapacity: "Số người phải là một số lớn hơn 0.",
    },

    notifications: {
      createSuccess: "Tạo loại phòng thành công",
      createError: "Không thể tạo loại phòng",
      updateSuccess: "Cập nhật loại phòng thành công",
      updateError: "Không thể cập nhật loại phòng",
      deleteSuccess: "Xóa loại phòng thành công",
      deleteError: "Không thể xóa loại phòng",
    },
  },

  housekeeping: {
    title: "Quản lý buồng phòng",
    subtitle: "Theo dõi nhiệm vụ dọn phòng và tình trạng xử lý.",
    search: "Tìm theo số phòng hoặc người phụ trách",
    create: "Tạo nhiệm vụ",

    columns: {
      room: "Phòng",
      assignee: "Người phụ trách",
      task: "Nhiệm vụ",
      status: "Trạng thái",
      createdAt: "Ngày tạo",
    },

    taskTitle: "Nhiệm vụ buồng phòng",
    createTitle: "Tạo nhiệm vụ buồng phòng",
    createSubtitle: "Phân công công việc cho phòng và nhân viên phụ trách.",

    loadingDetail: "Đang tải thông tin nhiệm vụ…",
    taskInformation: "Thông tin nhiệm vụ",

    room: "Phòng",
    assignee: "Nhân viên phụ trách",
    taskType: "Loại nhiệm vụ",
    notes: "Ghi chú buồng phòng",
    notesPlaceholder: "Nhập ghi chú buồng phòng...",

    chooseRoom: "Chọn phòng",
    chooseStaff: "Chọn nhân viên",
    chooseAssignee: "Chọn nhân viên phụ trách",

    loadingStaff: "Đang tải nhân viên…",
    noStaff: "Không có nhân viên phù hợp",
    staffLoadError: "Không thể tải danh sách nhân viên.",

    createdAt: "Ngày tạo",
    unassigned: "Chưa phân công",

    states: {
      loadError: "Không thể tải danh sách nhiệm vụ.",
      loadErrorHint: "Vui lòng thử tải lại danh sách.",
      empty: "Không tìm thấy nhiệm vụ buồng phòng.",
      emptyHint: "Thử thay đổi từ khóa hoặc trạng thái.",
    },

    pickers: {
      roomsTitle: "Danh sách phòng",
      roomColumns: {
        name: "Tên phòng",
        type: "Loại phòng",
        capacity: "Sức chứa",
      },
      staffTitle: "Danh sách nhân viên",
      staffColumns: {
        name: "Họ và tên",
        phone: "Số điện thoại",
        email: "Email",
        position: "Vị trí",
      },
    },

    validation: {
      roomRequired: "Vui lòng chọn phòng.",
      staffRequired: "Vui lòng chọn nhân viên.",
    },

    notifications: {
      createSuccess: "Tạo nhiệm vụ phòng thành công",
      createError: "Tạo nhiệm vụ phòng thất bại",
      updateSuccess: "Cập nhật nội dung nhiệm vụ phòng thành công",
      updateError: "Cập nhật nội dung nhiệm vụ phòng thất bại",
    },

    types: {
      CLEANING: "Dọn phòng",
      INSPECTION: "Kiểm tra phòng",
    },

    status: {
      PENDING: "Chưa thực hiện",
      IN_PROGRESS: "Đang thực hiện",
      COMPLETED: "Hoàn thành",
    },
  },

  schedules: {
    title: "Quản lý lịch làm",
    subtitle: "Theo dõi và phân công ca làm cho nhân viên.",
    search: "Tìm theo tên hoặc email nhân viên…",
    create: "Tạo lịch",

    allPositions: "Tất cả vị trí",
    previousWeek: "Tuần trước",
    nextWeek: "Tuần sau",
    previousRange: "Khoảng ngày trước",
    nextRange: "Khoảng ngày sau",
    chooseRange: "Chọn khoảng ngày",
    applyRange: "Áp dụng",
    fromDate: "Từ ngày",
    toDate: "Đến ngày",
    loadMore: "Tải thêm nhân viên",
    loadingMore: "Đang tải…",

    staff: "Nhân viên",
    workDate: "Ngày làm",
    shift: "Ca làm",

    chooseStaff: "Chọn nhân viên",
    loadingShifts: "Đang tải ca làm…",
    noShifts: "Không có ca làm phù hợp",

    dialogTitle: "Tạo lịch",
    dialogSubtitle: "Phân công ca làm cho nhân viên.",

    shifts: {
      MORNING: "Ca sáng",
      AFTERNOON: "Ca chiều",
      NIGHT: "Ca tối",
      OFFICE: "Ca hành chính",
      ADMINISTRATIVE: "Ca hành chính",
    },

    weekdays: {
      monday: "Thứ Hai",
      tuesday: "Thứ Ba",
      wednesday: "Thứ Tư",
      thursday: "Thứ Năm",
      friday: "Thứ Sáu",
      saturday: "Thứ Bảy",
      sunday: "Chủ Nhật",
    },

    loadError: "Không thể tải lịch phân ca.",
    loadHint: "Vui lòng thử tải lại lịch phân ca.",
    empty: "Không tìm thấy nhân viên.",
    emptyHint: "Thử thay đổi từ khóa hoặc vị trí.",

    removeTitle: "Xóa lịch làm?",
    removeDescription:
      "Lịch phân ca này sẽ được xóa khỏi tuần làm việc. Bạn có chắc muốn tiếp tục?",
    remove: "Xóa lịch làm",
    removing: "Đang xóa…",

    addFor: "Thêm ca cho {{name}} ngày {{date}}",
    removeFor: "Xóa {{shift}} của {{name}}",

    picker: {
      title: "Danh sách nhân viên",
      columns: {
        name: "Họ và tên",
        phone: "Số điện thoại",
        email: "Email",
        position: "Vị trí",
      },
    },

    notifications: {
      createSuccess: "Tạo ca làm thành công",
      createError: "Tạo ca làm thất bại",
      removeSuccess: "Xóa lịch làm thành công",
      removeError: "Xóa lịch làm thất bại",
      noShiftDefinitions: "Không có ca làm phù hợp.",
    },
  },

  promotions: {
    title: "Quản lý khuyến mãi",
    subtitle: "Quản lý các chương trình ưu đãi áp dụng cho đặt phòng.",
    search: "Tìm theo tên hoặc mã khuyến mãi",
    create: "Tạo khuyến mãi",
    entity: "khuyến mãi",
    usageCount: "{{count}} lượt",

    columns: {
      promotion: "Khuyến mãi",
      type: "Loại",
      discount: "Mức giảm",
      scope: "Phạm vi",
      used: "Đã dùng",
      validity: "Hiệu lực",
      status: "Trạng thái",
      actions: "Thao tác",
    },

    actions: {
      edit: "Chỉnh sửa",
      delete: "Xóa khuyến mãi",
      openMenu: "Mở thao tác cho {{name}}",
    },

    types: {
      AUTO: "Tự động",
      CODE: "Mã code",
    },

    discountTypes: {
      PERCENTAGE: "Phần trăm",
      FIXED_AMOUNT: "Số tiền cố định",
    },

    scopes: {
      INVOICE: "Toàn bộ",
      ROOM: "Tiền phòng",
      SERVICE: "Tiền dịch vụ",
    },

    status: {
      active: "Đang hoạt động",
      expired: "Hết hạn",
    },

    states: {
      loadError: "Không thể tải danh sách khuyến mãi.",
      loadErrorHint: "Vui lòng thử tải lại dữ liệu.",
      empty: "Không tìm thấy khuyến mãi.",
      emptyHint: "Thử thay đổi từ khóa tìm kiếm.",
    },

    messages: {
      createSuccess: "Tạo khuyến mãi thành công",
      updateSuccess: "Cập nhật khuyến mãi thành công",
      deleteSuccess: "Xóa khuyến mãi thành công",
      genericError: "Có lỗi xảy ra",
    },

    validation: {
      dateRangeRequired: "Vui lòng chọn ngày bắt đầu và ngày kết thúc.",
    },

    deleteDialog: {
      title: "Xóa {{name}}?",
      description:
        "Khuyến mãi sẽ được xóa theo các quy tắc và ràng buộc hiện có của hệ thống. Bạn có chắc muốn tiếp tục?",
      deleting: "Đang xóa…",
    },

    createDialog: {
      title: "Tạo khuyến mãi",
      submit: "Tạo khuyến mãi",
    },

    editDialog: {
      title: "Chỉnh sửa khuyến mãi",
      submit: "Lưu thay đổi",
    },

    form: {
      generalInformation: "Thông tin chương trình",
      promotionType: "Loại khuyến mãi",
      codePromotion: "Mã khuyến mãi",
      automaticPromotion: "Tự áp dụng",

      programName: "Tên chương trình",
      programNamePlaceholder: "Ví dụ: Khuyến mãi cuối tuần",

      promotionCode: "Mã khuyến mãi",

      priority: "Ưu tiên",
      priorityHint: "Số nhỏ hơn có mức ưu tiên cao hơn.",

      description: "Mô tả",

      discountConfiguration: "Cấu hình giảm giá",
      discountType: "Loại giảm giá",
      discountValue: "Giá trị giảm",
      percentage: "Phần trăm (%)",
      fixedAmount: "Số tiền (VND)",
      maximumDiscount: "Giảm tối đa",
      optional: "Không bắt buộc",

      conditionsAndScope: "Điều kiện & phạm vi",
      scope: "Phạm vi áp dụng",

      minimumOrderValue: "Giá trị đơn tối thiểu",
      usageLimit: "Giới hạn lượt sử dụng",

      stackPromotions: "Gộp khuyến mãi",
      allow: "Cho phép",
      no: "Không",

      validityPeriod: "Thời gian hiệu lực",
      startDate: "Ngày bắt đầu",
      endDate: "Ngày kết thúc",
    },
  },

  services: {
    title: "Quản lý dịch vụ khách sạn",
    subtitle:
      "Quản lý và theo dõi các dịch vụ được cung cấp cho khách lưu trú.",
    search: "Tìm theo tên dịch vụ",
    create: "Thêm dịch vụ",
    priceValue: "{{value}} đ",

    columns: {
      id: "ID",
      name: "Tên dịch vụ",
      price: "Giá",
      type: "Loại",
      actions: "Thao tác",
    },

    types: {
      SERVICE: "Dịch vụ",
      AMENITY: "Tiện nghi",
      EXTRA_FEE: "Phụ phí",
    },

    actions: {
      edit: "Chỉnh sửa",
      delete: "Xóa dịch vụ",
      openMenu: "Mở thao tác cho {{name}}",
    },

    states: {
      loadError: "Không thể tải danh sách dịch vụ.",
      loadErrorHint: "Vui lòng thử tải lại dữ liệu.",
      empty: "Không tìm thấy dịch vụ.",
      emptyHint: "Thử thay đổi từ khóa tìm kiếm.",
    },

    messages: {
      createSuccess: "Tạo mới dịch vụ thành công",
      createError: "Tạo mới dịch vụ thất bại",
      updateSuccess: "Cập nhật thông tin dịch vụ thành công",
      updateError: "Cập nhật thông tin dịch vụ thất bại",
      deleteSuccess: "Xóa dịch vụ thành công",
      deleteError: "Xóa dịch vụ thất bại",
    },

    deleteDialog: {
      title: "Xóa dịch vụ “{{name}}”?",
      description:
        "Dịch vụ sẽ được xóa theo các quy tắc và ràng buộc hiện có của hệ thống. Bạn có chắc muốn tiếp tục?",
    },

    createDialog: {
      title: "Thêm dịch vụ",
      subtitle: "Thêm dịch vụ mới vào danh mục của khách sạn.",
      submit: "Thêm dịch vụ",
    },

    editDialog: {
      title: "Chỉnh sửa dịch vụ",
      subtitle: "Cập nhật thông tin dịch vụ.",
      submit: "Lưu thay đổi",
    },

    form: {
      name: "Tên dịch vụ",
      namePlaceholder: "Nhập tên dịch vụ",
      price: "Giá tiền",
      priceAriaLabel: "Giá tiền bằng VND",
      description: "Mô tả dịch vụ",
      descriptionPlaceholder: "Nhập mô tả dịch vụ",
      type: "Loại dịch vụ",
    },
  },

  reviews: {
    title: "Quản lý đánh giá",
    subtitle: "Theo dõi phản hồi và trải nghiệm của khách lưu trú.",
    search: "Tìm theo khách hàng hoặc phòng",

    average: "Đánh giá trung bình",
    total: "Tổng đánh giá",
    hidden: "Đánh giá ẩn",

    listTitle: "Danh sách đánh giá",

    visible: "Hiển thị",
    hiddenStatus: "Đã ẩn",
    room: "Phòng {{name}}",
    ratingAriaLabel: "{{value}} trên 5 sao",

    actions: {
      hide: "Ẩn đánh giá",
      show: "Hiển thị lại",
      openMenu: "Mở thao tác cho đánh giá của {{name}}",
    },

    states: {
      loadError: "Không thể tải danh sách đánh giá.",
      loadErrorHint: "Vui lòng thử tải lại dữ liệu.",
      retry: "Thử lại",
      noMatch: "Không tìm thấy đánh giá phù hợp.",
      empty: "Chưa có đánh giá.",
      searchHint: "Thử thay đổi từ khóa tìm kiếm.",
    },

    hideDialog: {
      title: "Ẩn đánh giá?",
      description: "Đánh giá này sẽ không còn hiển thị với khách hàng.",
      cancel: "Hủy",
      hiding: "Đang ẩn…",
    },

    messages: {
      showSuccess: "Đã hiển thị lại đánh giá.",
      hideSuccess: "Đã ẩn đánh giá.",
      updateError: "Không thể cập nhật trạng thái đánh giá.",
    },

    aria: {
      loadingList: "Đang tải danh sách đánh giá",
    },
  },

  staff: {
    title: "Quản lý nhân sự",
    subtitle: "Quản lý nhân viên và quyền truy cập hệ thống.",
    search: "Tìm theo tên, email, số điện thoại…",
    create: "Thêm nhân sự",

    columns: {
      employee: "Nhân viên",
      phone: "Số điện thoại",
      email: "Email",
      position: "Vị trí",
      status: "Trạng thái",
      actions: "Thao tác",
    },

    actions: {
      edit: "Chỉnh sửa",
      resetPassword: "Đặt lại mật khẩu",
      deactivate: "Vô hiệu hóa tài khoản",
      activate: "Kích hoạt tài khoản",
    },
    status: { active: "Đang hoạt động", inactive: "Ngừng hoạt động" },
    empty: { loadError: "Không thể tải danh sách nhân sự.", noMatch: "Không tìm thấy nhân sự phù hợp.", noData: "Chưa có nhân sự.", retryHint: "Vui lòng thử tải lại dữ liệu.", searchHint: "Thử thay đổi từ khóa tìm kiếm.", createHint: "Thêm nhân sự để bắt đầu quản lý tài khoản." },
    aria: { openActions: "Mở thao tác cho {{name}}", closeDialog: "Đóng hộp thoại", editContent: "Nội dung chỉnh sửa nhân sự" },

    deactivateDialog: {
      title: "Vô hiệu hóa tài khoản?",
      description:
        "Tài khoản của {{name}} sẽ chuyển sang trạng thái ngừng hoạt động.",
    },

    validation: {
      incomplete: "Thiếu thông tin nhân sự",
      fullNameRequired: "Họ tên không được để trống",
      fullNameLength: "Họ tên phải có ít nhất 2 ký tự",
      phoneInvalid: "Số điện thoại không hợp lệ",
      emailRequired: "Email không được để trống",
      emailInvalid: "Email không đúng định dạng",
      passwordRequired: "Mật khẩu không được để trống",
    },

    messages: {
      createSuccess: "Tạo nhân sự thành công",
      createError: "Tạo nhân sự thất bại",
      updateSuccess: "Cập nhật thông tin nhân sự thành công",
      updateError: "Cập nhật thông tin nhân sự thất bại",
      passwordSuccess: "Thay đổi mật khẩu thành công",
      passwordError: "Thay đổi mật khẩu thất bại",
    },

    createDialog: {
      title: "Thêm nhân sự",
      subtitle: "Thêm thông tin nhân sự mới vào hệ thống.",

      employeeInformation: "THÔNG TIN NHÂN VIÊN",
      fullName: "Họ và tên",
      phone: "Số điện thoại",
      email: "Email",
      position: "Chức vụ",

      create: "Thêm nhân sự",
    },

    editDialog: {
      title: "Chỉnh sửa nhân sự",

      tabs: {
        information: "Thông tin",
        password: "Mật khẩu",
      },

      employeeInformation: "THÔNG TIN NHÂN VIÊN",
      fullName: "Họ và tên",
      phone: "Số điện thoại",
      email: "Email",
      position: "Chức vụ",

      roleCannotChange: "Vai trò hệ thống không thể thay đổi.",

      permissionsAndAccess: "QUYỀN & TRUY CẬP",

      adminPermission: "Quyền quản trị",
      adminPermissionDescription:
        "Tài khoản đang có vai trò quản trị hệ thống.",
      noAdminPermissionDescription:
        "Tài khoản không có vai trò quản trị hệ thống.",
      required: "Bắt buộc",
      notGranted: "Không có",

      accountStatus: "Trạng thái tài khoản",
      accountActiveDescription: "Tài khoản đang hoạt động.",
      accountInactiveDescription: "Tài khoản đang ngừng hoạt động.",

      resetPassword: "Đặt lại mật khẩu",
      resetPasswordDescription: "Thiết lập mật khẩu mới cho tài khoản này.",
      newPassword: "Mật khẩu mới",
      newPasswordPlaceholder: "Nhập mật khẩu mới",
      hidePassword: "Ẩn mật khẩu",
      showPassword: "Hiển thị mật khẩu",
    },
  },
  profile: {
    title: "Tài khoản của tôi",
    subtitle: "Quản lý thông tin cá nhân và bảo mật tài khoản.",
    information: "Thông tin cá nhân",
    informationEyebrow: "THÔNG TIN CÁ NHÂN",
    security: "Bảo mật",
    securityEyebrow: "BẢO MẬT TÀI KHOẢN",
    securityDescription: "Cập nhật mật khẩu cho tài khoản đang đăng nhập.",
    editInformation: "Chỉnh sửa thông tin",
    fullName: "Họ và tên",
    role: "Chức vụ",
    roleReadOnly: "Chức vụ chỉ đọc",
    roleManaged: "Chức vụ được quản lý bởi hệ thống.",
    currentPassword: "Mật khẩu hiện tại",
    newPassword: "Mật khẩu mới",
    confirmPassword: "Xác nhận mật khẩu mới",
    hidePassword: "Ẩn {{field}}",
    showPassword: "Hiển thị {{field}}",
    changePassword: "Đổi mật khẩu",
    loadError: "Không thể tải thông tin tài khoản.",
    loadHint: "Vui lòng thử tải lại dữ liệu.",
    validation: {
      fullNameRequired: "Họ và tên không được để trống.",
      emailRequired: "Email không được để trống.",
      emailInvalid: "Email không hợp lệ.",
      currentPasswordRequired: "Vui lòng nhập mật khẩu hiện tại.",
      newPasswordRequired: "Vui lòng nhập mật khẩu mới.",
      newPasswordLength: "Mật khẩu mới phải từ 6 ký tự trở lên.",
      confirmPasswordRequired: "Vui lòng xác nhận mật khẩu.",
      passwordMismatch: "Mật khẩu xác nhận không khớp.",
    },
    messages: {
      updateSuccess: "Thông tin của bạn đã được cập nhật.",
      updateError: "Không thể cập nhật thông tin lúc này. Vui lòng thử lại.",
      passwordSuccess: "Mật khẩu đã được cập nhật.",
      passwordError:
        "Không thể đổi mật khẩu lúc này. Vui lòng kiểm tra lại và thử lại.",
    },
  },
  receptionist: {
    title: "Hoạt động lễ tân hôm nay",
    subtitle: "Theo dõi các công việc cần xử lý trong ca trực.",
    todayBookings: "Đặt phòng hôm nay",
    availableRooms: "Phòng còn trống",
    cleanRooms: "Phòng sạch",
    actions: {
      retry: "Thử lại",
    },
    states: {
      loading: "Đang tải…",
      noData: "Không có dữ liệu.",
      loadError: "Không thể tải đầy đủ hoạt động lễ tân.",
    },
    activity: {
      title: "Hoạt động hôm nay",
      subtitle: "Khách đến và rời khách sạn trong ngày.",
      checkInsTitle: "Check-in hôm nay",
      checkOutsTitle: "Check-out hôm nay",
      noCheckIns: "Hôm nay chưa có khách check-in.",
      noCheckOuts: "Hôm nay chưa có khách check-out.",
      missingGuestName: "Chưa có tên khách",
    },
    bookingStats: {
      title: "Thống kê đặt phòng",
      total: "Tổng lượt đặt phòng",
      successful: "Đặt phòng thành công",
      cancelled: "Đặt phòng bị hủy",
      cancellationRate: "Tỷ lệ hủy",
    },
    revenue: {
      month: "Tháng {{month}}",
      tooltip: "Doanh thu: {{value}}",
    },
    topCustomers: {
      title: "Khách hàng hàng đầu",
      bookingCount: "{{count}} lượt đặt phòng",
    },
  },
} as const;

export default vi;
