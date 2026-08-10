const en = {
  common: {
    actions: {
      save: "Save",
      saveChanges: "Save changes",
      cancel: "Cancel",
      close: "Close",
      create: "Create",
      edit: "Edit",
      delete: "Delete",
      retry: "Retry",
      search: "Search",
      viewDetails: "View details",
      showMore: "Show more…",
    },
    states: {
      loading: "Loading…",
      saving: "Saving…",
      creating: "Creating…",
      updating: "Updating…",
      deleting: "Deleting…",
      noInformation: "No information",
      noResults: "No matching results found.",
    },
    status: { active: "Active", inactive: "Inactive", all: "All" },
    fields: {
      status: "Status",
      actions: "Actions",
      name: "Name",
      email: "Email",
      phone: "Phone number",
      notes: "Notes",
    },
    entityPicker: {
      defaultTitle: "Available options",
      search: "Search…",
      loading: "Loading data…",
      empty: "No data available",
    },
    pagination: {
      previousPage: "Previous page",
      nextPage: "Next page",
      goToPage: "Go to page {{page}}",
    },
    roles: {
      ADMIN: "System Administrator",
      MANAGER: "Manager",
      RECEPTION: "Receptionist",
      RECEPTIONIST: "Receptionist",
      HOUSEKEEPING: "Housekeeping",
      USER: "Guest",
    },
  },
  client: {
    header: {
      navigation: {
        home: "Home",
        rooms: "Rooms",
        amenities: "Amenities",
        about: "About Us",
        contact: "Contact",
      },
      actions: {
        signIn: "Sign In",
        bookNow: "Book Now",
      },
      account: {
        guest: "Guest",
        openMenu: "Open account menu for {{name}}",
        profile: "Profile",
        changePassword: "Change Password",
        logout: "Log Out",
      },
      mobile: {
        openMenu: "Open menu",
        closeMenu: "Close menu",
      },
      language: {
        label: "Language",
        vi: "Switch to Vietnamese",
        en: "Switch to English",
      },
    },
    auth: {
      backToHome: "Back to home",
      hero: {
        eyebrow: "DIAMOND SEA DA NANG",
        title: "A relaxing stay begins here.",
        description: "Manage your reservations and prepare for your seaside journey in a private, convenient space.",
      },
      password: {
        show: "Show password",
        hide: "Hide password",
      },
    },
    login: {
      eyebrow: "GUEST ACCOUNT",
      title: "Welcome back.",
      description: "Sign in to view and manage your stays at Diamond Sea.",
      fields: {
        email: "Email",
        emailPlaceholder: "example@email.com",
        password: "Password",
      },
      actions: {
        forgotPassword: "Forgot password?",
        signIn: "Sign In",
        signingIn: "Signing in…",
        signUp: "Sign Up",
      },
      signUpPrompt: "Don't have an account?",
      validation: {
        invalidEmail: "Enter a valid email address.",
        invalidPassword: "Enter your password.",
      },
      errors: {
        loginFailed: "Unable to sign in. Check your details and try again.",
      },
      messages: {
        registrationCompleted: "Your account has been created. You can now sign in to continue.",
        passwordReset: "Your password has been updated. You can now sign in with your new password.",
      },
    },
    register: {
      eyebrow: "CREATE AN ACCOUNT",
      title: "Begin your journey with Diamond Sea.",
      description: "Create an account to save your details and manage your stays more conveniently.",
      fields: {
        fullName: "Full name",
        email: "Email",
        phone: "Phone number",
        password: "Password",
        confirmPassword: "Confirm password",
      },
      passwordRequirement: "Your password must contain at least 6 characters.",
      signInPrompt: "Already have an account?",
      actions: {
        creating: "Creating account…",
        signUp: "Sign Up",
        signIn: "Sign In",
      },
      validation: {
        fullNameRequired: "Enter your full name.",
        emailRequired: "Enter your email address.",
        emailInvalid: "Enter a valid email address.",
        phoneRequired: "Enter your phone number.",
        phoneInvalid: "Enter a valid phone number.",
        passwordRequired: "Enter a password.",
        passwordLength: "Your password must contain at least 6 characters.",
        confirmPasswordRequired: "Confirm your password.",
        passwordMismatch: "The passwords do not match.",
      },
      errors: {
        registrationFailed: "Unable to create your account. Please try again.",
      },
    },
    forgotPassword: {
      eyebrow: "ACCOUNT RECOVERY",
      title: "Forgot your password?",
      description: "Enter the email associated with your account and we'll send password reset instructions.",
      fields: {
        email: "Email",
        emailPlaceholder: "example@email.com",
      },
      actions: {
        sending: "Sending instructions…",
        sendInstructions: "Send Instructions",
        backToLogin: "Back to Sign In",
      },
      validation: {
        emailRequired: "Enter your email address.",
        emailInvalid: "Enter a valid email address.",
      },
      errors: {
        requestFailed: "Unable to send password reset instructions. Please try again.",
      },
      success: {
        title: "Check your email.",
        description: "If this address matches an account, password reset instructions will be sent to your inbox.",
        received: "We received a recovery request for {{email}}. Please also check your spam folder.",
      },
    },
    resetPassword: {
      eyebrow: "ACCOUNT SECURITY",
      title: "Reset your password.",
      description: "Choose a new password for your Diamond Sea account.",
      passwordRequirement: "Your new password must contain at least 6 characters.",
      fields: {
        password: "New password",
        confirmPassword: "Confirm new password",
      },
      actions: {
        updating: "Updating…",
        reset: "Reset Password",
        backToLogin: "Back to Sign In",
      },
      validation: {
        passwordRequired: "Enter a password.",
        passwordLength: "Your password must contain at least 6 characters.",
        confirmPasswordRequired: "Confirm your new password.",
        passwordMismatch: "The passwords do not match.",
      },
      errors: {
        resetFailed: "Unable to reset your password. The link may have expired.",
      },
    },
    home: {
      hero: {
        location: "DA NANG BEACHFRONT, VIETNAM",
        title: "Find your rhythm by the sea.",
        description: "A modern, relaxing stay between the ocean breeze and the energy of Da Nang.",
        bookStay: "Book Your Stay",
        exploreRooms: "Explore Rooms",
      },
      search: {
        formLabel: "Search rooms",
        stayDate: "Stay date",
        checkIn: "Check-in",
        checkOut: "Check-out",
        guests: "Guests",
        guestCount: "Number of guests",
        submit: "Search Rooms",
        validation: {
          checkInRequired: "Select a check-in date.",
          checkOutRequired: "Select a check-out date.",
          dateRangeRequired: "Select your check-in and check-out dates.",
        },
      },
      rooms: {
        eyebrow: "RESTFUL SPACES",
        title: "Rooms made for unhurried days.",
        viewAll: "View All Room Types",
      },
      roomCard: {
        capacity: "Up to {{count}} guests",
        perNight: "/ night",
        bookRoom: "Book Room",
      },
      intro: {
        imageAlt: "Modern architecture at Diamond Sea Da Nang",
        eyebrow: "THE DIAMOND SEA STORY",
        title: "A pause between the sea and the city.",
        firstParagraph: "Diamond Sea offers an elegant retreat by the Da Nang coast, where comfortable rooms, a convenient location and thoughtful hospitality come together for an effortless journey.",
        secondParagraph: "From mornings beside the sea to days exploring the city, every experience is designed so you can enjoy Da Nang at your own pace.",
        exploreAmenities: "Explore Amenities",
      },
      amenities: {
        eyebrow: "SIGNATURE AMENITIES",
        title: "Everything you need, thoughtfully considered.",
        items: {
          breakfast: "Daily Breakfast",
          pool: "Relaxing Pool",
          wifi: "High-Speed Wi-Fi",
          parking: "Parking",
          fitness: "Fitness Center",
          workspace: "Workspace",
          reception: "24/7 Reception",
          roomService: "Room Service",
        },
      },
      destination: {
        title: "Da Nang just outside your door.",
        description: "Close to the beach, with easy access to the city center and Central Vietnam's signature destinations.",
        highlights: {
          beach: "My Khe Beach — just minutes away",
          dragonBridge: "Dragon Bridge — about 10 minutes",
          hoiAn: "Hoi An Ancient Town — about 35 minutes",
        },
        directions: "Get Directions",
        imageAlt: "Hotel retreat and swimming pool",
      },
      cta: {
        eyebrow: "YOUR STAY AWAITS",
        title: "Your Da Nang journey starts here.",
        description: "Choose your stay dates and let Diamond Sea prepare a truly comfortable space for you.",
        bookStay: "Book Your Stay",
      },
    },
    footer: {
      description: "A modern beachfront stay where you can experience Da Nang at your own pace.",
      explore: {
        title: "Explore",
        rooms: "Rooms",
        amenities: "Amenities",
        about: "About Us",
        contact: "Contact",
      },
      guestServices: {
        title: "Guest Services",
        findRooms: "Find Rooms",
        myBookings: "My Bookings",
        help: "Help",
        faq: "Frequently Asked Questions",
      },
      contact: {
        title: "Contact",
        address: "71 Ngu Hanh Son, Da Nang",
        reception: "Reception available 24/7",
      },
      legal: {
        terms: "Terms",
        privacy: "Privacy",
      },
    },
    search: {
      hero: {
        eyebrow: "YOUR STAY AT DIAMOND SEA",
        title: "Choose the space for your stay.",
        description: "Explore room types suited to your selected dates and number of guests.",
      },
      summary: {
        guests_one: "{{count}} guest",
        guests_other: "{{count}} guests",
        nights_one: "{{count}} night",
        nights_other: "{{count}} nights",
      },
      searchForm: {
        formLabel: "Search rooms",
        stayDate: "Stay date",
        checkIn: "Check-in",
        checkOut: "Check-out",
        guests: "Guests",
        guestCount: "Number of guests",
        submit: "Update Search",
      },
      results: {
        title: "Rooms suited to your stay",
        count_one: "{{count}} room type available",
        count_other: "{{count}} room types available",
      },
      sort: {
        label: "Sort rooms",
        priceAscending: "Price: Low to High",
        priceDescending: "Price: High to Low",
      },
      roomCard: {
        eyebrow: "DIAMOND SEA ROOM",
        capacity_one: "Up to {{count}} guest",
        capacity_other: "Up to {{count}} guests",
        pricePerNight: "Price per night",
        soldOut: "Sold Out",
        selectRoom: "Select Room",
        viewDetails: "View Details",
        viewDetailsFor: "View details for {{room}}",
      },
      legacyRoomCard: {
        imageAlt: "Image of {{room}}",
        name: "Room {{room}}",
        capacity_one: "{{count}} person",
        capacity_other: "{{count}} people",
        fallbackType: "Room type",
      },
      states: {
        loading: "Loading rooms",
        errorTitle: "Unable to load available rooms.",
        errorDescription: "Please try again. Your stay details have been preserved.",
        noResultsImageAlt: "No matching rooms",
        noResultsTitle: "No rooms match this stay yet.",
        noResultsDescription: "Try changing your check-in date, check-out date or number of guests.",
      },
      actions: {
        retry: "Retry",
        modifySearch: "Modify Search",
      },
      errors: {
        roomTypeUnavailable: "This room type is no longer available for the selected dates.",
        datesRequired: "Enter both your check-in and check-out dates.",
      },
    },
    roomDetail: {
      breadcrumbs: {
        label: "Breadcrumb navigation",
        home: "Home",
        rooms: "Rooms",
        details: "Room Details",
      },
      fallbackRoomName: "Diamond Sea Room",
      gallery: {
        fallbackAlt: "Diamond Sea hotel interior",
        viewImageOfRoom: "View image {{index}} of {{room}}",
        viewImage: "View image {{index}}",
        imageAlt: "{{room}} - image {{index}}",
        loadError: "Unable to load image",
        activeImageLoadError: "Unable to load this image",
        viewAll: "View All Photos",
        dialogLabel: "Photo gallery for {{room}}",
        close: "Close photo gallery",
        previous: "Previous image",
        next: "Next image",
      },
      room: {
        eyebrow: "DIAMOND SEA ROOM",
        capacity_one: "Up to {{count}} guest",
        capacity_other: "Up to {{count}} guests",
        about: "About This Room",
        amenities: "Room Amenities",
      },
      price: {
        from: "From",
        perNight: "/ night",
      },
      booking: {
        pricePerNightFrom: "Price per night from",
        checkIn: "Check-in",
        checkOut: "Check-out",
        guests: "Guests",
        guestOption_one: "{{count}} guest",
        guestOption_other: "{{count}} guests",
        checkAvailability: "Check Availability",
        confirmationNote: "Room availability and price are confirmed in the next step.",
      },
      reviews: {
        sectionLabel: "Guest Reviews",
        empty: "There are no reviews for this room type yet.",
        eyebrow: "GUEST EXPERIENCES",
        title: "Stays worth remembering.",
        ratingLabel: "{{rating}} out of 5",
        count_one: "{{count}} review",
        count_other: "{{count}} reviews",
        noComment: "The guest did not leave a comment.",
        nights_one: "{{count}} night",
        nights_other: "{{count}} nights",
      },
      relatedRooms: {
        eyebrow: "KEEP EXPLORING",
        title: "Discover Other Room Types",
      },
      relatedRoomCard: {
        capacity_one: "Up to {{count}} guest",
        capacity_other: "Up to {{count}} guests",
        perNight: "/ night",
        bookRoom: "Book Room",
      },
    },
    booking: {
      hero: {
        eyebrow: "COMPLETE YOUR BOOKING",
        title: "Confirm your stay.",
        description: "Review your room details and enter your contact information to continue to payment.",
      },
      guestInformation: {
        title: "Guest Information",
        description: "We'll use this information to confirm and contact you about your stay.",
        fullName: "Full Name",
        phone: "Phone Number",
        email: "Email",
        bookingForTitle: "Who are you booking for?",
        stayingGuestLabel: "Staying guest",
        self: "I am the staying guest",
        someoneElse: "I'm booking for someone else",
      },
      arrival: {
        title: "Arrival Time",
        checkInWindow: "Check-in is available from 14:00 to 22:00.",
        checkInWindowWithDate: "Check-in is available from 14:00 to 22:00 on {{date}}.",
        estimatedTime: "Estimated arrival time",
        optional: "(optional)",
        unspecified: "Not specified",
        localTime: "Local time in Da Nang",
      },
      summary: {
        roomImageAlt: "{{room}} room",
        eyebrow: "YOUR STAY",
        capacity: "Maximum capacity: {{count}} guests",
        capacity_one: "Maximum capacity: {{count}} guest",
        capacity_other: "Maximum capacity: {{count}} guests",
        checkIn: "Check-in",
        checkOut: "Check-out",
        nights: "{{count}} nights",
        nights_one: "{{count}} night",
        nights_other: "{{count}} nights",
        priceSummary: "Price Summary",
        roomSubtotal: "Room Subtotal",
        discount: "Discount",
        total: "Total",
        paymentReviewNote: "You'll review the payment step before completing your booking.",
      },
      policies: {
        title: "Stay Rules",
        description: "Please review the rules that apply to this stay.",
        quietHours: "Quiet hours",
        quietHoursValue: "22:00–06:00",
        pets: "Pets",
        petsValue: "Not allowed",
        confirmation: "By continuing, you confirm that you have reviewed these stay rules.",
      },
      actions: {
        creating: "Creating booking…",
        continueToPayment: "Continue to Payment",
      },
      states: {
        creatingBooking: "Creating booking…",
        loadingSummary: "Loading stay information",
      },
      validation: {
        guestNameRequired: "Enter the booking guest's full name.",
        phoneRequired: "Enter a phone number.",
        phoneInvalid: "Enter a valid phone number.",
        emailRequired: "Enter an email address.",
        emailInvalid: "Enter a valid email address.",
        checkInRequired: "Select a check-in date.",
        checkOutRequired: "Select a check-out date.",
        checkInInvalid: "Enter a valid check-in date.",
        checkOutInvalid: "Enter a valid check-out date.",
        checkOutAfterCheckIn: "The check-out date must be after the check-in date.",
      },
      errors: {
        missingRoom: "Room information is missing.",
        creationFailed: "Unable to create the booking.",
        quoteFailed: "Unable to update the price for this stay.",
      },
    },
    payment: {
      hero: {
        eyebrow: "BOOKING PAYMENT",
        title: "Complete the deposit for your stay.",
        description: "Review your stay details and pay the deposit to hold your room. The status will update after the system confirms the transaction.",
      },
      loading: {
        paymentInfo: "Loading payment information...",
        initializing: "Initializing payment…",
        creatingQr: "Creating payment QR code...",
      },
      notice: {
        successTitle: "Payment successful",
        pendingTitle: "Payment not completed",
        successDescription: "The transaction has been confirmed and your booking payment status has been updated.",
        pendingDescription: "The transaction has not been confirmed. Please try again or return to continue later.",
      },
      actions: {
        viewBooking: "View booking",
        back: "Go back",
        close: "Close",
        payAmount: "Pay {{amount}} VND",
      },
      errors: {
        missingQr: "Unable to retrieve the payment QR code",
        createQr: "Unable to create the payment QR code. Please try again.",
        createPayment: "Unable to initialize payment. Please try again.",
      },
      details: {
        eyebrow: "PAY TODAY",
        depositForBooking: "Deposit for the current booking",
        summaryTitle: "Payment Summary",
        totalStay: "Total stay value",
        payToday: "Pay today",
        remaining: "Remaining balance",
        depositTerms: "Deposit Terms",
        depositDescription: "The {{amount}} VND deposit is paid by QR code. The remaining balance is settled through the hotel's current payment process.",
        cancelWindow: "Cancellation is permitted within 24 hours of paying the deposit.",
        refundPolicy: "Cancellation within this period: 100% of the deposit is refunded.",
        noShowPolicy: "No-show: the {{amount}} VND deposit is forfeited.",
        qrUpdateNote: "The payment QR code will open on this page. The transaction status updates automatically after payment is recorded.",
      },
      qr: {
        title: "Pay by QR Code",
        instructions: "Scan the code with your banking app. You may close this window while the system continues checking the transaction.",
        alt: "Deposit payment QR code",
        transferContent: "Transfer description: {{content}}",
        noReload: "Do not reload the page after payment. The status updates automatically when the transaction is recorded.",
      },
      summary: {
        roomImageAlt: "{{room}} room",
        eyebrow: "YOUR STAY",
        roomType: "Room type",
        capacity: "Capacity",
        guests: "{{count}} guests",
        guests_one: "{{count}} guest",
        guests_other: "{{count}} guests",
        capacity_one: "Maximum capacity: {{count}} guest",
        capacity_other: "Maximum capacity: {{count}} guests",
        checkIn: "Check-in",
        checkOut: "Check-out",
        nights: "{{count}} nights",
        nights_one: "{{count}} night",
        nights_other: "{{count}} nights",
        price: "Price",
        subtotal: "Subtotal",
        discount: "Discount",
        tax: "Taxes and fees",
        paymentMethod: "Payment method",
        amountPaid: "Amount paid",
        remainingAmount: "Remaining amount",
        guestInfo: "Guest Information",
        totalStay: "Stay total",
      },
      legacy: {
        payment: "Payment", total: "Total", payAtHotel: "Pay at check-in",
        priceSummary: "Price Summary", originalPrice: "Original price", discount: "Discount", discountHint: "Enter a discount code if you have one",
        rulesTitle: "Review House Rules", rulesDescription: "The property asks you to agree to these house rules:", quietHours: "Quiet hours are from {{start}} to {{end}}", noPets: "Pets are not allowed", rulesConfirmation: "By continuing, you agree to these house rules.",
        arrivalTitle: "Your Arrival Time", arrivalWindow: "You can check in between 14:00 and 22:00 on {{date}}", estimatedArrival: "Add your estimated arrival time", optional: "(optional)", select: "Please select", localTime: "Da Nang local time",
        roomName: "Room {{name}}", people: "{{count}} people", people_one: "{{count}} person", people_other: "{{count}} people", roomType: "Room type",
        resultCount: "{{count}} matching search results", resultCount_one: "{{count}} matching search result", resultCount_other: "{{count}} matching search results", priceAscending: "Price: low to high", priceDescending: "Price: high to low",
        bookingInfo: "Booking Information", bookingInfoDescription: "Please review your booking information.", fullName: "Full Name", fullNamePlaceholder: "Enter full name", phone: "Phone Number", email: "Email", bookingFor: "Who are you booking for?", selfGuest: "I am the staying guest", otherGuest: "This booking is for someone else",
        bookingDetails: "Booking Details", guests: "{{count}} guests", guests_one: "{{count}} guest", guests_other: "{{count}} guests", nonRefundable: "This booking is non-refundable", customerInfo: "Customer Information", guestCount: "Number of guests", search: "Search rooms",
        steps: { selection: "Your selection", booking: "Booking", payment: "Payment" },
        depositNoticeTitle: "A room deposit is required", depositNoticeDescription: "A deposit of {{amount}} VND is required. The remaining balance will be paid directly at the hotel.", note: "Note", cancelWithin: "Cancellation is only permitted within 24 hours of paying the room deposit.", cancelBeforeLabel: "Cancel within 24 hours:", fullRefund: "receive a full deposit refund", noShowLabel: "No-show:", depositForfeited: "deposit forfeited ({{amount}} VND)",
      },
    },
    myBookings: {
      hero: {
        eyebrow: "YOUR STAYS",
        title: "My Bookings",
        description: "Keep track of upcoming stays and your stay history at Diamond Sea.",
      },
      tabs: { upcoming: "Upcoming", done: "Completed", cancelled: "Cancelled" },
      status: {
        PENDING: "Pending confirmation",
        CONFIRMED: "Confirmed",
        CANCELLED: "Cancelled",
        CHECKED_IN: "Checked in",
        CHECKED_OUT: "Completed",
      },
      card: {
        roomImageAlt: "{{room}} room at Diamond Sea",
        roomAndCode: "Room {{room}} · Booking code {{code}}",
        checkIn: "CHECK-IN",
        checkOut: "CHECK-OUT",
        staySummary: "{{nights}} nights · Maximum capacity {{guests}} guests",
        total: "Total value",
        discount: "Discount −{{amount}} VND",
        remaining: "Remaining {{amount}} VND",
      },
      actions: {
        retry: "Try again",
        exploreRooms: "Explore rooms",
        viewDetails: "View details",
        cancelBooking: "Cancel booking",
        bookAgain: "Book again",
        writeReview: "Write a review",
        viewReview: "View review",
      },
      states: {
        loadErrorTitle: "Unable to load bookings",
        loadErrorDescription: "Your stay information is currently unavailable. Please try again.",
      },
      empty: {
        upcoming: { title: "You have no upcoming stays.", description: "Explore rooms for your next stay at Diamond Sea." },
        done: { title: "You have no completed stays.", description: "Your stay history will appear here after check-out." },
        cancelled: { title: "You have no cancelled bookings.", description: "Cancelled bookings will be kept here for easy reference." },
      },
      cancelDialog: {
        title: "Confirm Booking Cancellation",
        closeAria: "Close booking cancellation dialog",
        confirmation: "Are you sure you want to cancel this booking?",
        description: "Please tell us why so the hotel can record your request.",
        reasonLabel: "Cancellation reason",
        reasonRequired: "Enter a cancellation reason.",
        reasonPlaceholder: "Enter your cancellation reason…",
        keepBooking: "Keep booking",
        cancelling: "Cancelling…",
        confirmCancel: "Confirm cancellation",
      },
      messages: {
        cancelSuccess: "Booking cancelled successfully",
        cancelError: "Unable to cancel the booking right now. Please try again.",
      },
      aria: {
        bookingCategories: "Booking categories",
        loadingBookings: "Loading booking list",
      },
    },
    bookingDetail: {
      hero: { eyebrow: "YOUR STAY", bookingCode: "Booking code: {{code}}" },
      status: {
        PENDING: "Pending confirmation",
        CONFIRMED: "Confirmed",
        CANCELLED: "Cancelled",
        CHECKED_IN: "Checked in",
        CHECKED_OUT: "Completed",
      },
      states: {
        loading: "Loading stay information…",
        loadErrorTitle: "Unable to load booking",
        loadErrorDescription: "This booking does not exist or is currently unavailable.",
      },
      stay: {
        roomImageAlt: "{{room}} room",
        room: "Room {{room}}",
        checkIn: "CHECK-IN",
        checkOut: "CHECK-OUT",
        nights: "{{count}} nights",
        nights_one: "{{count}} night",
        nights_other: "{{count}} nights",
        capacity: "Maximum capacity: {{count}} guests",
        capacity_one: "Maximum capacity: {{count}} guest",
        capacity_other: "Maximum capacity: {{count}} guests",
      },
      information: {
        title: "Stay Information",
        description: "Contact information provided for this booking.",
        guest: "Staying guest",
        phone: "Phone number",
        email: "Email",
        arrivalTime: "Estimated arrival time",
      },
      payment: {
        title: "Payment Summary",
        roomAmount: "Room amount",
        discount: "Discount",
        discountWithCode: "Discount ({{code}})",
        total: "Total value",
        paid: "Amount paid",
        remaining: "Remaining",
        note: "Amounts are shown using the booking's current payment information.",
      },
      policies: {
        title: "Booking Policy",
        refundable: "This booking is recorded as refundable. The actual conditions and refund amount are subject to hotel confirmation.",
        nonRefundable: "This booking is recorded as non-refundable. Please contact the hotel if you need assistance.",
      },
      management: { title: "Manage Booking", description: "Actions currently available for this booking." },
      actions: {
        backToBookings: "Back to My Bookings",
        myBookings: "My Bookings",
        cancelBooking: "Cancel booking",
        bookAgain: "Book again",
        writeReview: "Write a review",
        viewReview: "View review",
      },
      timeline: { booked: "Room booked", checkedIn: "Checked in", checkedOut: "Checked out", review: "Review", cancelled: "Booking cancelled" },
      countdown: {
        upcoming: "{{count}} days until your upcoming stay!",
        today: "Have a wonderful stay!",
        imageAlt: "Upcoming stay illustration",
      },
      cancelDialog: {
        title: "Confirm Booking Cancellation",
        closeAria: "Close booking cancellation dialog",
        confirmation: "Are you sure you want to cancel this booking?",
        description: "Please tell us why so the hotel can record your request.",
        reasonLabel: "Cancellation reason",
        reasonRequired: "Enter a cancellation reason.",
        reasonPlaceholder: "Enter your cancellation reason…",
        keepBooking: "Keep booking",
        cancelling: "Cancelling…",
        confirmCancel: "Confirm cancellation",
      },
      messages: {
        cancelSuccess: "Booking cancelled successfully",
        cancelError: "Unable to cancel the booking right now. Please try again.",
      },
    },
    profile: {
      hero: {
        eyebrow: "YOUR ACCOUNT",
        title: "My Profile",
        description: "Manage the personal information used for your stays at Diamond Sea.",
      },
      tabs: { information: "Personal Information", security: "Account Security" },
      information: {
        title: "Personal Information",
        description: "Your contact information helps the hotel prepare for and support your stay.",
      },
      security: {
        title: "Account Security",
        description: "Update your password regularly to protect your information and bookings.",
      },
      fields: {
        fullName: "Full Name",
        email: "Email",
        phone: "Phone Number",
        currentPassword: "Current Password",
        newPassword: "New Password",
        confirmPassword: "Confirm New Password",
        notUpdated: "Not provided",
      },
      actions: {
        retry: "Try again",
        edit: "Edit information",
        cancel: "Cancel",
        save: "Save changes",
        saving: "Saving…",
        changePassword: "Change password",
        updating: "Updating…",
      },
      states: {
        loadErrorTitle: "Unable to load profile",
        loadErrorDescription: "Your account information is currently unavailable. Please try again.",
      },
      validation: {
        fullNameRequired: "Full name is required.",
        emailRequired: "Email is required.",
        emailInvalid: "Enter a valid email address.",
        currentPasswordRequired: "Enter your current password.",
        newPasswordRequired: "Enter a new password.",
        newPasswordLength: "The new password must contain at least 6 characters.",
        confirmPasswordRequired: "Confirm your new password.",
        passwordMismatch: "The passwords do not match.",
      },
      messages: {
        updateSuccess: "Your information has been updated.",
        updateError: "Unable to update your information right now. Please try again.",
        passwordSuccess: "Your password has been updated.",
        passwordError: "Unable to change your password right now. Please check the details and try again.",
      },
      aria: { loading: "Loading profile", content: "Profile content" },
    },
    reviews: {
      list: {
        eyebrow: "YOUR EXPERIENCE",
        title: "My Reviews",
        description: "Look back on and share your thoughts about your stays at Diamond Sea.",
      },
      detail: {
        eyebrow: "YOUR EXPERIENCE",
        createTitle: "Share your thoughts about your stay.",
        viewTitle: "Your Diamond Sea Stay Review",
        createDescription: "Your honest feedback helps Diamond Sea improve every guest experience.",
        viewDescription: "The thoughts you shared after your stay at Diamond Sea.",
      },
      stay: {
        aria: "Reviewed stay",
        roomImageAlt: "{{room}} room at Diamond Sea",
        roomAndCode: "Room {{room}} · Booking code {{code}}",
        nights: "{{count}} nights",
        nights_one: "{{count}} night",
        nights_other: "{{count}} nights",
        capacity: "Maximum capacity: {{count}} guests",
        capacity_one: "Maximum capacity: {{count}} guest",
        capacity_other: "Maximum capacity: {{count}} guests",
        completedSummary: "{{count}} nights · Completed stay",
        completedSummary_one: "{{count}} night · Completed stay",
        completedSummary_other: "{{count}} nights · Completed stay",
      },
      rating: {
        aria: "{{value}} out of 5",
        criterionAria: "{{label}}: {{value}} out of 5",
      },
      overall: {
        createTitle: "How would you rate this stay?",
        viewTitle: "Overall Rating",
        createDescription: "Choose a rating that reflects your overall experience.",
        viewDescription: "Your overall impression of your stay at Diamond Sea.",
      },
      criteria: {
        title: "Detailed Ratings",
        createDescription: "Share your impression of each part of the stay.",
        viewDescription: "The ratings you gave each part of the stay.",
        amenities: "Amenities",
        cleanliness: "Cleanliness",
        comfort: "Comfort",
        location: "Location",
        valueForMoney: "Value for money",
        hygiene: "Hygiene",
      },
      comment: {
        createTitle: "Tell us more about your experience",
        viewTitle: "Your Comment",
        description: "Share what you loved or what Diamond Sea could improve.",
        placeholder: "Share your experience at the hotel.",
        aria: "Stay review comment",
        noComment: "You did not leave a written comment for this stay.",
        reviewDate: "Reviewed on {{date}}",
      },
      actions: {
        retry: "Try again",
        exploreRooms: "Explore rooms",
        viewDetails: "View details",
        myReviews: "My Reviews",
        cancel: "Cancel",
        submit: "Submit review",
        submitting: "Submitting…",
      },
      states: {
        loadErrorTitle: "Unable to load reviews",
        loadErrorDescription: "Your reviews are currently unavailable. Please try again.",
        emptyTitle: "No reviews yet",
        emptyDescription: "Your thoughts about your first stay will appear here after it is completed.",
        stayLoadError: "Unable to load stay information",
        reviewNotFound: "Review not found",
        unavailableDescription: "This content does not exist or is currently unavailable.",
      },
      validation: { ratingRequired: "Select a rating." },
      messages: { submitError: "Unable to submit your review right now. Please try again." },
      aria: { loadingList: "Loading review list", loadingDetail: "Loading review" },
    },
    notFound: {
      eyebrow: "DIAMOND SEA DA NANG",
      title: "Page not found",
      description: "The page you're looking for may have been moved, removed, or is currently unavailable. Return home or continue exploring rooms at Diamond Sea.",
      actions: { home: "Back to Home", rooms: "Explore Rooms" },
    },
    accountNavigation: {
      aria: "Customer account navigation",
      title: "Customer account",
      guest: "Guest",
      profile: "My Profile",
      bookings: "Booking History",
      reviews: "Reviews",
      logout: "Log out",
    },
    shared: {
      roomCard: {
        available: "Available",
        soldOut: "Sold out",
        capacity: "{{count}} people",
        capacity_one: "{{count}} person",
        capacity_other: "{{count}} people",
        bookRoom: "Book room",
      },
      bookingStepper: {
        aria: "Booking progress",
        selection: "Your selection",
        booking: "Booking",
        payment: "Payment",
      },
      booking: {
        noPhone: "No phone number provided",
        noEmail: "No email provided",
        checkIn: "Check-in",
        checkOut: "Check-out",
        nights: "{{count}} nights",
        nights_one: "{{count}} night",
        nights_other: "{{count}} nights",
        back: "Back",
        bookingCode: "BOOKING CODE",
        status: {
          PENDING: "Pending",
          CONFIRMED: "Upcoming",
          CHECKED_IN: "Checked in",
          CHECKED_OUT: "Completed",
          CANCELLED: "Cancelled",
        },
      },
    },
  },
  admin: {
    notFound: {
      title: "Page not found",
      description: "This address does not exist or is not available from your current operations workspace.",
      actions: { dashboard: "Return to Dashboard" },
    },
  },
  navigation: {
    aria: {
      adminNavigation: "Admin navigation",
      openNavigation: "Open admin navigation",
      openAccount: "Open account menu for {{name}}",
      accountOptions: "Account options",
    },
    groups: {
      overview: "OVERVIEW",
      operations: "OPERATIONS",
      business: "BUSINESS",
      experience: "GUEST EXPERIENCE",
      system: "SYSTEM",
    },
    items: {
      dashboard: "Dashboard",
      bookings: "Booking Management",
      frontDesk: "Front Desk",
      rooms: "Room Management",
      roomTypes: "Room Type Management",
      housekeeping: "Housekeeping",
      schedules: "Staff Schedule",
      promotions: "Promotion Management",
      services: "Service Management",
      reviews: "Review Management",
      staff: "Staff Management",
    },
    account: "My Account",
    language: "Language",
    logout: "Log out",
    product: "HOTEL OPERATIONS",
  },
  dashboard: {
    title: "Operations Overview",
    subtitle: "Monitor hotel performance and daily operations at a glance.",

    todayBookings: "Bookings today",
    availableRooms: "Available rooms",
    cleanRooms: "Clean rooms",
    weekRevenue: "Revenue this week",
    newCustomers: "New guests",

    noPreviousData: "No previous period data",

    todayActivity: "Today's activity",
    todayActivitySubtitle: "Guests arriving at and leaving the hotel today.",
    todayCheckIns: "Today's check-ins",
    todayCheckOuts: "Today's check-outs",

    reportsAndRevenue: "Reports & revenue",
    reportsAndRevenueSubtitle: "Monitor the hotel's business performance.",
    totalRevenue: "Total revenue",
    occupancyRate: "Occupancy rate",

    comparisons: {
      yesterday: "compared with yesterday",
      previousWeek: "compared with last week",
      previousMonth: "compared with last month",
    },

    activity: {
      noCheckIns: "No guest check-ins today.",
      noCheckOuts: "No guest check-outs today.",
      unknownGuest: "Guest name unavailable",
    },

    revenue: {
      monthlyTitle: "Monthly revenue",
      noData: "No revenue data available",
      chartAriaLabel: "Monthly revenue chart",
      seriesLabel: "Revenue",
    },

    bookingStats: {
      title: "Booking statistics",
      total: "Total bookings",
      successful: "Successful bookings",
      cancelled: "Cancelled bookings",
      cancellationRate: "Cancellation rate",
      noData: "No data available",
    },

    operations: {
      actions: {
        checkIn: "Check in",
        checkOut: "Check out",
      },
      status: {
        PENDING: "Pending",
        CONFIRMED: "Confirmed",
        CHECKED_IN: "Checked in",
        CHECKED_OUT: "Checked out",
        CANCELLED: "Cancelled",
      },
      actionFor: "{{action}} for {{target}}",
      roomTarget: "room {{room}}",
      unknownRoom: "unknown room",
    },
  },

  bookings: {
    title: "Booking Management",
    subtitle: "Find, monitor, and manage guest reservations.",
    search: "Search by booking code or guest name",
    create: "Create booking",
    processingPayment: "Processing payment, please wait...",

    status: {
      PENDING: "Pending confirmation",
      CONFIRMED: "Confirmed",
      CANCELLED: "Cancelled",
      CHECKED_IN: "Checked in",
      CHECKED_OUT: "Checked out",
    },

    actions: {
      checkIn: "Check in",
      checkOut: "Check out",
      cancel: "Cancel booking",
      continuePayment: "Continue payment",
      checkingIn: "Checking in…",
      checkingOut: "Checking out…",
      tooEarly: "Not yet available",
      roomInspectionInProgress: "Room inspection in progress",
      inspectRoom: "Inspect room",
      completed: "Completed",
      cancelled: "Booking cancelled",
    },

    columns: {
      code: "Code",
      guest: "Guest",
      phone: "Phone number",
      room: "Room",
      checkIn: "Check-in",
      checkOut: "Check-out",
      nights: "Nights",
      status: "Status",
    },

    list: {
      loadError: "Unable to load bookings.",
      retryHint: "Please try again later.",
      empty: "No matching bookings found.",
      emptyHint: "Try changing the search term or create a new booking.",
    },

    createDialog: {
      title: "Create booking",
      subtitle: "Enter guest information and choose a suitable room.",

      customerInformation: "Guest information",
      customerName: "Guest name",
      phone: "Phone number",

      stayInformation: "Stay information",
      checkInDate: "Check-in date",
      checkOutDate: "Check-out date",
      paymentMethod: "Payment method",

      roomType: "Room type",
      allRoomTypes: "All room types",
      room: "Room",
      chooseAvailableRoom: "Choose an available room",

      promotionCode: "Promotion code",
      promotionPlaceholder: "Enter promotion code",
      applyPromotion: "Apply",

      noAvailableRooms: "No rooms are available at this time",
      priceSummary: "PRICE SUMMARY",
      unitPrice: "Unit price:",

      create: "Create booking",
    },

    detail: {
      eyebrow: "BOOKING",

      tabs: {
        information: "Information",
        services: "Services",
        housekeeping: "Housekeeping",
        payment: "Payment",
      },

      guestInformation: "GUEST INFORMATION",
      guest: "Guest",
      phone: "Phone",
      email: "Email",
      bookedFor: "Booked for / Actual guest",
      no: "No",
      yes: "Yes",

      stayInformation: "STAY INFORMATION",
      checkIn: "Check-in",
      checkOut: "Check-out",
      nights: "Nights",
      expectedArrivalTime: "Expected arrival time",
      status: "Status",

      roomAssignment: "ROOM ASSIGNMENT",
      assignedRoom: "Assigned room",

      overdue: "Overdue",

      hotelServices: "Hotel services",
      serviceTab: "Services",
      incidentalsTab: "Incidentals",
      bookingServices: "Booking services",
      noServices: "No services yet.",
      noServicesHint: "Select a service on the left to add it to the booking.",
      loadingServices: "Loading services...",
      added: "Added",
      noMatchingServices: "No matching services",
      servicesEmptyHint: "Services will appear here when available.",
      quantity: "Quantity: {{count}}",

      housekeepingWork: "Housekeeping tasks",
      noHousekeepingTasks: "No housekeeping tasks",
      chooseTask: "Select a task",
      chooseTaskHint: "Task details will appear here.",
      addTask: "Add task",
      loadingHousekeeping: "Loading data...",
      housekeepingTaskDetail: "Task details",
      housekeepingTaskDetailHint: "Track operational status, assignment, and notes.",
      taskType: "Task type",
      assignee: "Assigned staff",
      unassigned: "Unassigned",
      workDate: "Work date",
      housekeepingNotes: "Housekeeping notes",
      housekeepingNotesPlaceholder: "Enter housekeeping notes...",

      paymentHistory: "Payment history",
      loadingPayment: "Loading payment information...",
      noTransactions: "No transactions yet",
      noTransactionsHint: "Payment history will appear here.",
      transfer: "Bank transfer",
      deposit: "Deposit",
      success: "Successful",

      paymentSummary: "Payment summary",
      roomCharge: "Room",
      serviceCharge: "Services",
      subtotal: "Subtotal",
      discount: "Discount",
      tax: "Tax",
      total: "Total",
      paid: "Paid",
      remaining: "Remaining",
      paymentMethod: "Payment method",
      pay: "Pay",
      nightCount: "{{count}} nights",
    },

    paymentMethods: {
      CASH: "Cash",
      TRANSFER: "Bank transfer",
      BANK_TRANSFER: "Online payment",
      E_WALLET: "E-wallet",
      CARD: "Card",
      ONLINE: "Online payment",
    },

    paymentStatus: {
      PENDING: "Pending",
      SUCCESS: "Successful",
      FAILED: "Failed",
      REFUNDED: "Refunded",
    },

    paymentTypes: {
      DEPOSIT: "Deposit",
      ROOM_PAYMENT: "Room payment",
      SERVICE_PAYMENT: "Service payment",
      REFUND: "Refund",
    },

    housekeepingTypes: {
      CLEANING: "Room cleaning",
      INSPECTION: "Room inspection",
    },

    housekeepingStatus: {
      PENDING: "Pending",
      IN_PROGRESS: "In progress",
      COMPLETED: "Completed",
    },

    roomPicker: {
      title: "Choose an available room",
      subtitle: "Choose a room that matches the selected stay dates.",
      search: "Search by room name",
      columns: {
        room: "Room",
        roomType: "Room type",
        capacity: "Capacity",
      },
      loading: "Loading available rooms...",
      empty: "No matching rooms",
      emptyHint: "Try changing the stay dates or room type.",
      guests: "{{count}} guests",
      select: "Select room",
    },

    cancelDialog: {
      title: "Confirm booking cancellation",
      description: "Please tell us why you want to cancel this booking.",
      reason: "Cancellation reason",
      reasonPlaceholder: "Enter the reason for cancellation…",
      confirm: "Confirm cancellation",
      keep: "Keep booking",
    },

    checkInDialog: {
      title: "Confirm check-in",
      bookingInformation: "Booking information",
      customer: "Guest",
      paymentInformation: "Payment information",
      confirmPayment: "Confirm payment",
    },

    qrDialog: {
      title: "Pay by QR code",
      successTitle: "Payment successful",
      description: "Scan the code with your banking app to complete payment.",
      successDescription: "The transaction has been confirmed and recorded in the system.",
      confirmed: "Payment confirmed",
      creating: "Creating payment QR code...",
      imageAlt: "Bank payment QR code",
      transferContent: "Transfer reference",
      instructions: "Scan the QR code with your banking app. The system will update automatically when the transaction is confirmed.",
      confirming: "Confirming...",
      markSuccessful: "Mark as successful",
    },

    currency: {
      code: "VND",
      symbol: "₫",
      amount: "VND {{value}}",
      perNight: "VND {{value}}/night",
    },

    validation: {
      roomRequired: "Please select a room",
      checkInRequired: "Please select a check-in date",
      checkOutRequired: "Please select a check-out date",
      checkOutAfterCheckIn: "The check-out date must be after the check-in date",
      missingRoomOrDates: "Room or stay dates are missing",
      validRoomAndDatesRequired: "Please select a room and valid stay dates",
      missingRoom: "Room information is missing",
      cancelReasonRequired: "Please enter a cancellation reason.",
    },

    messages: {
      cashPaymentSuccess: "Cash payment completed successfully",
      bookingAndPaymentSuccess: "Booking and payment completed successfully",
      bookingCreatedContinuePayment: "Booking created. Continue payment to confirm the booking",
      createBookingError: "Unable to create the booking",
      promotionApplied: "Promotion {{code}} applied successfully, saving ₫{{discount}}",
      promotionNotApplicable: "This promotion does not apply to the booking",
      promotionApplyError: "Unable to apply the promotion. Please check the code and try again.",
      createBookingRetryError: "Unable to create the booking. Please try again",
      createPaymentError: "Unable to create the payment",
      paymentSuccess: "Payment successful",
      completePaymentError: "Unable to complete the payment",
      cancelPaymentSuccess: "Payment cancelled successfully",
      cancelPaymentError: "Unable to cancel the payment",
      createOnlinePaymentError: "Unable to create the online payment",
      changeRoomSuccess: "Room changed successfully",
      changeRoomError: "Unable to change the room",
      checkInSuccess: "Check-in completed successfully",
      checkInError: "Unable to check in",
      checkOutSuccess: "Check-out completed successfully",
      checkOutError: "Unable to check out",
      cancelBookingSuccess: "Booking cancelled successfully",
      cancelBookingError: "Unable to cancel the booking",
      paymentRequiredBeforeCheckOut: "The full invoice must be paid before check-out",
      paymentRequiredBeforeCheckIn: "The room charge must be paid before check-in",
      roomInspectionComplete: "Room inspection completed",
      housekeepingTaskCreated: "Housekeeping task created successfully",
      noHousekeepingStaffOnShift: "No housekeeping staff are currently on shift!",
      createHousekeepingTaskError: "Unable to create the housekeeping task",
    },
  },

  rooms: {
    title: "Room Management",
    subtitle: "Monitor hotel rooms and their operational status.",
    search: "Search by room number",
    create: "Add room",

    loadError: "Unable to load rooms.",
    empty: "No rooms found.",
    emptyHint: "Try changing the search term or room type.",

    allRoomTypes: "All",
    guests: "{{count}} guests",
    currency: "VND",
    perNight: "/ night",
    pricePerNight: "VND / night",

    fields: {
      status: "STATUS",
    },

    aria: {
      roomTypeTabs: "Filter by room type",
      roomImage: "Room {{name}} image",
      roomActions: "Actions for room {{name}}",
      updateRoomStatus: "Update status for room {{name}}",
    },

    status: {
      VACANT_CLEAN: "Available · Clean",
      VACANT_DIRTY: "Available · Needs cleaning",
      OCCUPIED_CLEAN: "Occupied · Clean",
      OCCUPIED_DIRTY: "Occupied · Needs cleaning",
      OUT_OF_SERVICE: "Out of service",
    },

    actions: {
      edit: "Edit",
      delete: "Delete room",
    },

    createDialog: {
      title: "Create room",
      subtitle: "Enter the new room information.",
      information: "ROOM INFORMATION",
      roomName: "Room name / number",
      roomNamePlaceholder: "Enter room name",
      roomType: "Room type",
      chooseRoomType: "Choose room type",
      create: "Create room",
    },

    editDialog: {
      title: "Edit room",
      information: "ROOM INFORMATION",
      roomName: "Room name / number",
      roomType: "Room type",

      roomTypeInformation: "ROOM TYPE INFORMATION",
      price: "Price",
      capacity: "Capacity",
      amenities: "Amenities",
    },

    states: {
      loadingRoomInformation: "Loading room information…",
      noAmenities: "No amenity information available.",
    },

    validation: {
      roomNameRequired: "Room name is required.",
      roomTypeRequired: "Room type is required.",
    },

    notifications: {
      statusUpdateSuccess: "Room status updated successfully",
      statusUpdateError: "Unable to update room status",
      createSuccess: "Room created successfully",
      updateSuccess: "Room updated successfully",
      deleteSuccess: "Room deleted successfully",
      genericError: "Something went wrong",
    },

  },

  roomTypes: {
    title: "Room Type Management",
    subtitle: "Manage room categories, amenities, and rates.",
    search: "Search by room type",
    create: "Add room type",
    guests: "{{count}} guests",
    currency: "VND",

    columns: {
      id: "ID",
      name: "Room type",
      capacity: "Capacity",
      pricePerNight: "Price / night",
      actions: "Actions",
    },

    actions: {
      edit: "Edit",
      delete: "Delete room type",
    },

    aria: {
      actions: "Room type actions",
      rowActions: "Actions for room type {{name}}",
      imageAlt: "Room type image {{index}}",
      removeImage: "Remove image {{index}}",
    },

    states: {
      loadError: "Unable to load room types.",
      empty: "No room types found.",
      emptyHint: "Try changing the search term.",
      loadingDetails: "Loading room type information…",
      amenitiesLoadError: "Unable to load amenities.",
    },

    createDialog: {
      title: "Add room type",

      generalInformation: "GENERAL INFORMATION",
      name: "Room type name",
      guestCount: "Guests",
      price: "Price",
      description: "Description",

      servicesAndAmenities: "SERVICES & AMENITIES",
      amenitiesHint: "Select the amenities available for this room type.",
      chooseServicesAndAmenities: "Choose services and amenities",

      images: "IMAGES",
      addImage: "Add image",

      create: "Add room type",
    },

    editDialog: {
      title: "Edit room type",
      code: "ID {{code}}",

      generalInformation: "GENERAL INFORMATION",
      name: "Room type name",
      guestCount: "Guests",
      price: "Price",
      description: "Description",

      servicesAndAmenities: "SERVICES & AMENITIES",
      amenitiesHint: "Select the amenities available for this room type.",
      chooseServicesAndAmenities: "Choose services and amenities",

      images: "IMAGES",
      addImage: "Add image",
    },

    deleteDialog: {
      title: "Delete room type {{name}}?",
      description:
        "Are you sure you want to continue? Existing deletion rules and constraints will still apply.",
    },

    validation: {
      invalidPrice: "Room price is required and must be a valid number.",
      capacityRequired: "Guest capacity is required.",
      invalidCapacity: "Guest capacity must be greater than 0.",
    },

    notifications: {
      createSuccess: "Room type created successfully",
      createError: "Unable to create room type",
      updateSuccess: "Room type updated successfully",
      updateError: "Unable to update room type",
      deleteSuccess: "Room type deleted successfully",
      deleteError: "Unable to delete room type",
    },
  },

  housekeeping: {
    title: "Housekeeping Management",
    subtitle: "Monitor room-cleaning tasks and their current status.",
    search: "Search by room number or assignee",
    create: "Create task",

    columns: {
      room: "Room",
      assignee: "Assignee",
      task: "Task",
      status: "Status",
      createdAt: "Created",
    },

    taskTitle: "Housekeeping task",
    createTitle: "Create housekeeping task",
    createSubtitle: "Assign a task to a room and staff member.",

    loadingDetail: "Loading task details…",
    taskInformation: "Task information",

    room: "Room",
    assignee: "Assigned staff",
    taskType: "Task type",
    notes: "Housekeeping notes",
    notesPlaceholder: "Enter housekeeping notes...",

    chooseRoom: "Choose room",
    chooseStaff: "Choose employee",
    chooseAssignee: "Choose assigned staff",

    loadingStaff: "Loading employees…",
    noStaff: "No suitable employees",
    staffLoadError: "Unable to load employees.",

    createdAt: "Created",
    unassigned: "Unassigned",

    states: {
      loadError: "Unable to load housekeeping tasks.",
      loadErrorHint: "Please try loading the list again.",
      empty: "No housekeeping tasks found.",
      emptyHint: "Try changing the search term or status.",
    },

    pickers: {
      roomsTitle: "Room list",
      roomColumns: {
        name: "Room name",
        type: "Room type",
        capacity: "Capacity",
      },
      staffTitle: "Employee list",
      staffColumns: {
        name: "Full name",
        phone: "Phone number",
        email: "Email",
        position: "Position",
      },
    },

    validation: {
      roomRequired: "Please select a room.",
      staffRequired: "Please select an employee.",
    },

    notifications: {
      createSuccess: "Housekeeping task created successfully",
      createError: "Unable to create the housekeeping task",
      updateSuccess: "Housekeeping task updated successfully",
      updateError: "Unable to update the housekeeping task",
    },

    types: {
      CLEANING: "Room cleaning",
      INSPECTION: "Room inspection",
    },

    status: {
      PENDING: "Pending",
      IN_PROGRESS: "In progress",
      COMPLETED: "Completed",
    },
  },

  schedules: {
    title: "Staff Schedule",
    subtitle: "Review and assign employee shifts.",
    search: "Search by employee name…",
    create: "Create schedule",

    allPositions: "All positions",
    previousWeek: "Previous week",
    nextWeek: "Next week",

    staff: "Employee",
    workDate: "Work date",
    shift: "Shift",

    chooseStaff: "Choose employee",
    loadingShifts: "Loading shifts…",
    noShifts: "No suitable shifts",

    dialogTitle: "Create schedule",
    dialogSubtitle: "Assign a work shift to an employee.",

    shifts: {
      MORNING: "Morning shift",
      AFTERNOON: "Afternoon shift",
      NIGHT: "Night shift",
      OFFICE: "Administrative shift",
      ADMINISTRATIVE: "Administrative shift",
    },

    weekdays: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    },

    loadError: "Unable to load the staff schedule.",
    loadHint: "Please try loading the staff schedule again.",
    empty: "No employees found.",
    emptyHint: "Try changing the search term or position.",

    removeTitle: "Delete schedule?",
    removeDescription:
      "This shift assignment will be removed from the work week. Are you sure you want to continue?",
    remove: "Delete schedule",
    removing: "Deleting…",

    addFor: "Add a shift for {{name}} on {{date}}",
    removeFor: "Remove {{shift}} from {{name}}",

    picker: {
      title: "Employee list",
      columns: {
        name: "Full name",
        phone: "Phone number",
        email: "Email",
        position: "Position",
      },
    },

    notifications: {
      createSuccess: "Shift created successfully",
      createError: "Unable to create the shift",
      removeSuccess: "Schedule removed successfully",
      removeError: "Unable to remove the schedule",
      noShiftDefinitions: "No suitable shifts are available.",
    },
  },

  promotions: {
    title: "Promotion Management",
    subtitle: "Manage promotional offers for hotel bookings.",
    search: "Search by promotion name or code",
    create: "Create promotion",
    entity: "promotion",
    usageCount: "{{count}} uses",

    columns: {
      promotion: "Promotion",
      type: "Type",
      discount: "Discount",
      scope: "Scope",
      used: "Used",
      validity: "Validity",
      status: "Status",
      actions: "Actions",
    },

    actions: {
      edit: "Edit",
      delete: "Delete promotion",
      openMenu: "Open actions for {{name}}",
    },

    types: {
      AUTO: "Automatic",
      CODE: "Code",
    },

    discountTypes: {
      PERCENTAGE: "Percentage",
      FIXED_AMOUNT: "Fixed amount",
    },

    scopes: {
      INVOICE: "Entire invoice",
      ROOM: "Room charges",
      SERVICE: "Service charges",
    },

    status: {
      active: "Active",
      expired: "Expired",
    },

    states: {
      loadError: "Unable to load promotions.",
      loadErrorHint: "Please try loading the data again.",
      empty: "No promotions found.",
      emptyHint: "Try changing the search term.",
    },

    messages: {
      createSuccess: "Promotion created successfully",
      updateSuccess: "Promotion updated successfully",
      deleteSuccess: "Promotion deleted successfully",
      genericError: "Something went wrong",
    },

    validation: {
      dateRangeRequired: "Please select both a start date and an end date.",
    },

    deleteDialog: {
      title: "Delete {{name}}?",
      description:
        "The promotion will be deleted according to the system's existing rules and constraints. Are you sure you want to continue?",
      deleting: "Deleting…",
    },

    createDialog: {
      title: "Create promotion",
      submit: "Create promotion",
    },

    editDialog: {
      title: "Edit promotion",
      submit: "Save changes",
    },

    form: {
      generalInformation: "Promotion information",
      promotionType: "Promotion type",
      codePromotion: "Promotion code",
      automaticPromotion: "Automatic promotion",

      programName: "Promotion name",
      programNamePlaceholder: "Example: Weekend promotion",

      promotionCode: "Promotion code",

      priority: "Priority",
      priorityHint: "A lower number has a higher priority.",

      description: "Description",

      discountConfiguration: "Discount configuration",
      discountType: "Discount type",
      discountValue: "Discount value",
      percentage: "Percentage (%)",
      fixedAmount: "Fixed amount",
      maximumDiscount: "Maximum discount",
      optional: "Optional",

      conditionsAndScope: "Conditions & scope",
      scope: "Applies to",

      minimumOrderValue: "Minimum order value",
      usageLimit: "Usage limit",

      stackPromotions: "Combine promotions",
      allow: "Allow",
      no: "No",

      validityPeriod: "Validity period",
      startDate: "Start date",
      endDate: "End date",
    },
  },

  services: {
    title: "Hotel Service Management",
    subtitle: "Manage services available to hotel guests.",
    search: "Search by service name",
    create: "Add service",
    priceValue: "{{value}} VND",

    columns: {
      id: "ID",
      name: "Service name",
      price: "Price",
      type: "Type",
      actions: "Actions",
    },

    types: {
      SERVICE: "Service",
      AMENITY: "Amenity",
      EXTRA_FEE: "Surcharge",
    },

    actions: {
      edit: "Edit",
      delete: "Delete service",
      openMenu: "Open actions for {{name}}",
    },

    states: {
      loadError: "Unable to load services.",
      loadErrorHint: "Please try loading the data again.",
      empty: "No services found.",
      emptyHint: "Try changing the search term.",
    },

    messages: {
      createSuccess: "Service created successfully",
      createError: "Unable to create the service",
      updateSuccess: "Service information updated successfully",
      updateError: "Unable to update the service information",
      deleteSuccess: "Service deleted successfully",
      deleteError: "Unable to delete the service",
    },

    deleteDialog: {
      title: "Delete service “{{name}}”?",
      description:
        "The service will be deleted according to the system's existing rules and constraints. Are you sure you want to continue?",
    },

    createDialog: {
      title: "Add service",
      subtitle: "Add a new service to the hotel's service catalog.",
      submit: "Add service",
    },

    editDialog: {
      title: "Edit service",
      subtitle: "Update the service information.",
      submit: "Save changes",
    },

    form: {
      name: "Service name",
      namePlaceholder: "Enter the service name",
      price: "Price",
      priceAriaLabel: "Price in VND",
      description: "Service description",
      descriptionPlaceholder: "Enter a service description",
      type: "Service type",
    },
  },

  reviews: {
    title: "Review Management",
    subtitle: "Monitor guest feedback and stay experiences.",
    search: "Search by guest or room",

    average: "Average rating",
    total: "Total reviews",
    hidden: "Hidden reviews",

    listTitle: "Review list",

    visible: "Visible",
    hiddenStatus: "Hidden",
    room: "Room {{name}}",
    ratingAriaLabel: "{{value}} out of 5 stars",

    actions: {
      hide: "Hide review",
      show: "Show again",
      openMenu: "Open actions for {{name}}'s review",
    },

    states: {
      loadError: "Unable to load reviews.",
      loadErrorHint: "Please try loading the data again.",
      retry: "Try again",
      noMatch: "No matching reviews found.",
      empty: "No reviews yet.",
      searchHint: "Try changing the search term.",
    },

    hideDialog: {
      title: "Hide review?",
      description: "This review will no longer be visible to guests.",
      cancel: "Cancel",
      hiding: "Hiding…",
    },

    messages: {
      showSuccess: "The review is visible again.",
      hideSuccess: "The review has been hidden.",
      updateError: "Unable to update the review status.",
    },

    aria: {
      loadingList: "Loading review list",
    },
  },

  staff: {
    title: "Staff Management",
    subtitle: "Manage employees and system access.",
    search: "Search by name, email, or phone…",
    create: "Add employee",

    columns: {
      employee: "Employee",
      phone: "Phone number",
      email: "Email",
      position: "Position",
      status: "Status",
      actions: "Actions",
    },

    actions: {
      edit: "Edit",
      resetPassword: "Reset password",
      deactivate: "Deactivate account",
      activate: "Activate account",
    },
    status: { active: "Active", inactive: "Inactive" },
    empty: { loadError: "Unable to load employees.", noMatch: "No matching employees found.", noData: "No employees yet.", retryHint: "Please try loading the data again.", searchHint: "Try changing the search term.", createHint: "Add an employee to begin managing accounts." },
    aria: { openActions: "Open actions for {{name}}", closeDialog: "Close dialog", editContent: "Employee edit content" },

    deactivateDialog: {
      title: "Deactivate account?",
      description: "{{name}}'s account will be changed to inactive status.",
    },

    validation: {
      incomplete: "Employee information is incomplete",
      fullNameRequired: "Full name is required",
      fullNameLength: "Full name must contain at least 2 characters",
      phoneInvalid: "Enter a valid phone number",
      emailRequired: "Email is required",
      emailInvalid: "Enter a valid email address",
      passwordRequired: "Password is required",
    },

    messages: {
      createSuccess: "Employee created successfully",
      createError: "Unable to create the employee",
      updateSuccess: "Employee information updated successfully",
      updateError: "Unable to update the employee information",
      passwordSuccess: "Password changed successfully",
      passwordError: "Unable to change the password",
    },

    createDialog: {
      title: "Add employee",
      subtitle: "Add a new employee to the system.",

      employeeInformation: "EMPLOYEE INFORMATION",
      fullName: "Full name",
      phone: "Phone number",
      email: "Email",
      position: "Position",

      create: "Add employee",
    },

    editDialog: {
      title: "Edit employee",

      tabs: {
        information: "Information",
        password: "Password",
      },

      employeeInformation: "EMPLOYEE INFORMATION",
      fullName: "Full name",
      phone: "Phone number",
      email: "Email",
      position: "Position",

      roleCannotChange: "The system role cannot be changed.",

      permissionsAndAccess: "PERMISSIONS & ACCESS",

      adminPermission: "Administrator access",
      adminPermissionDescription:
        "This account currently has the System Administrator role.",
      noAdminPermissionDescription:
        "This account does not have the System Administrator role.",
      required: "Required",
      notGranted: "Not granted",

      accountStatus: "Account status",
      accountActiveDescription: "This account is active.",
      accountInactiveDescription: "This account is inactive.",

      resetPassword: "Reset password",
      resetPasswordDescription: "Set a new password for this account.",
      newPassword: "New password",
      newPasswordPlaceholder: "Enter new password",
      hidePassword: "Hide password",
      showPassword: "Show password",
    },
  },
  profile: {
    title: "My Account",
    subtitle: "Manage your personal information and account security.",
    information: "Personal information",
    informationEyebrow: "PERSONAL INFORMATION",
    security: "Security",
    securityEyebrow: "ACCOUNT SECURITY",
    securityDescription: "Update the password for your signed-in account.",
    editInformation: "Edit information",
    fullName: "Full name",
    role: "Role",
    roleReadOnly: "Read-only role",
    roleManaged: "This role is managed by the system.",
    currentPassword: "Current password",
    newPassword: "New password",
    confirmPassword: "Confirm new password",
    hidePassword: "Hide {{field}}",
    showPassword: "Show {{field}}",
    changePassword: "Change password",
    loadError: "Unable to load account information.",
    loadHint: "Please try loading the data again.",
    validation: {
      fullNameRequired: "Full name is required.",
      emailRequired: "Email is required.",
      emailInvalid: "Enter a valid email address.",
      currentPasswordRequired: "Enter your current password.",
      newPasswordRequired: "Enter a new password.",
      newPasswordLength: "The new password must contain at least 6 characters.",
      confirmPasswordRequired: "Confirm your new password.",
      passwordMismatch: "The passwords do not match.",
    },
    messages: {
      updateSuccess: "Your information has been updated.",
      updateError:
        "Unable to update your information right now. Please try again.",
      passwordSuccess: "Your password has been updated.",
      passwordError:
        "Unable to change your password right now. Please check the details and try again.",
    },
  },
  receptionist: {
    title: "Front desk activity today",
    subtitle: "Monitor tasks that need attention during the current shift.",
    todayBookings: "Bookings today",
    availableRooms: "Available rooms",
    cleanRooms: "Clean rooms",
    actions: {
      retry: "Retry",
    },
    states: {
      loading: "Loading…",
      noData: "No data available.",
      loadError: "Unable to load all front desk activity.",
    },
    activity: {
      title: "Today's activity",
      subtitle: "Guests arriving at and leaving the hotel today.",
      checkInsTitle: "Today's check-ins",
      checkOutsTitle: "Today's check-outs",
      noCheckIns: "There are no check-ins today.",
      noCheckOuts: "There are no check-outs today.",
      missingGuestName: "Guest name unavailable",
    },
    bookingStats: {
      title: "Booking statistics",
      total: "Total bookings",
      successful: "Successful bookings",
      cancelled: "Cancelled bookings",
      cancellationRate: "Cancellation rate",
    },
    revenue: {
      month: "Month {{month}}",
      tooltip: "Revenue: {{value}}",
    },
    topCustomers: {
      title: "Top customers",
      bookingCount: "{{count}} bookings",
    },
  },
} as const;

export default en;
