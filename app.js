// GS25 CRM Loyalty Application - 100% GS25 Vietnam App Logic & Simulator Controls
document.addEventListener('DOMContentLoaded', () => {

  // --- APPLICATION STATE ---
  const state = {
    activePage: 'home-screen',
    tulanhTab: 'storage',
    userStamps: 6,
    userPoints: 9500,
    claimedRewards: [4],
    cardBalance: 120000,
    selectedCardId: '20002',
    selectedCardName: 'GS25 Standard 200K',
    cardHeroClass: 'black-hero',
    currentDetail: null,
    myGifts: [
      {
        id: 1,
        title: 'Trà Xanh Youus Boseong Green Tea Iced Tea 340ml',
        exp: 'Hạn đổi 30/6/25',
        bgClass: 'coca-bg',
        tag: 'SĂN COCA',
        subTitle: 'NHẬN QUÀ COOL'
      },
      {
        id: 2,
        title: 'GS25 tặng bạn Panna Cotta kiwi hoặc dâu trị giá 15k',
        exp: 'Hạn đổi 30/6/25',
        bgClass: 'chill-bg',
        tag: 'BỮA XẾ CHILL',
        subTitle: 'PANNA COTTA 15K'
      },
      {
        id: 3,
        title: 'GS25 tặng bạn 1 chai nước mơ trị giá 25k',
        exp: 'Hạn đổi 30/6/25',
        bgClass: 'mo-bg',
        tag: 'MƠ ĐI ELM',
        subTitle: 'NƯỚC MƠ 25K'
      }
    ],
    txnLogs: [
      { type: 'debit', title: 'Thanh toán E-Gift Card tại GS25 Nguyễn Gian Thanh', date: '16/08/2026 21:38', amount: -400000 },
      { type: 'credit', title: 'Nạp tiền tại quầy POS Thẻ E-Gift 500k (+20k Bonus 4%)', date: '15/08/2026 10:15', amount: 520000 }
    ],
    qrTimeLeft: 15,
    qrTimerInterval: null
  };

  // --- DOM ELEMENTS ---
  const appPages = document.querySelectorAll('.app-page');
  const topSwitchBtns = document.querySelectorAll('.switch-btn[data-target]');
  const bottomNavTabs = document.querySelectorAll('.nav-tab[data-nav]');

  // Home Screen Elements
  const homeOpenQrBtn = document.getElementById('homeOpenQrBtn');
  const quickDealsBtn = document.getElementById('quickDealsBtn');
  const quickRewardsBtn = document.getElementById('quickRewardsBtn');
  const quickCardsBtn = document.getElementById('quickCardsBtn');
  const seeAllDealsBtn = document.getElementById('seeAllDealsBtn');
  const seeAllRewardsBtn = document.getElementById('seeAllRewardsBtn');
  const openStampGameCard = document.getElementById('openStampGameCard');
  const storageSeeAllBtn = document.getElementById('storageSeeAllBtn');
  const storageUseBtn = document.getElementById('storageUseBtn');
  const viewPointsDetailBtn = document.getElementById('viewPointsDetailBtn');

  // Webview Back Buttons
  const backToHomeFromStamp = document.getElementById('backToHomeFromStamp');
  const backToHomeFromCard = document.getElementById('backToHomeFromCard');
  const backToHomeFromFridge = document.getElementById('backToHomeFromFridge');

  // Deals & News Screen
  const tabDealsBtn = document.getElementById('tabDealsBtn');
  const tabNewsBtn = document.getElementById('tabNewsBtn');
  const dealsGridPanel = document.getElementById('dealsGridPanel');
  const newsGridPanel = document.getElementById('newsGridPanel');
  const filterPills = document.querySelectorAll('.filter-pill');

  // Floating Action Widget
  const floatingPromoWidget = document.getElementById('floatingPromoWidget');
  const closeFloatingWidgetBtn = document.getElementById('closeFloatingWidgetBtn');
  const openFloatingQrBtn = document.getElementById('openFloatingQrBtn');

  // Stamp Game DOM
  const earnedStampsCount = document.getElementById('earnedStampsCount');
  const stampGrid = document.getElementById('stampGrid');
  const stampProgressFill = document.getElementById('stampProgressFill');
  const simPurchaseBtn = document.getElementById('simPurchaseBtn');
  const simMissionBtn = document.getElementById('simMissionBtn');
  const simResetStampsBtn = document.getElementById('simResetStampsBtn');

  const claimBtn4 = document.getElementById('claimBtn4');
  const claimBtn6 = document.getElementById('claimBtn6');
  const claimBtn9 = document.getElementById('claimBtn9');

  // E-Gift Card Sub-Views DOM
  const egiftCardListView = document.getElementById('egift-card-list-view');
  const egiftCardDetailView = document.getElementById('egift-card-detail-view');
  const backToCardCatalogBtn = document.getElementById('backToCardCatalogBtn');
  const openCardDetailDirectBtn = document.getElementById('openCardDetailDirectBtn');
  const scrollToTncBtn = document.getElementById('scrollToTncBtn');
  const tncDetailsBox = document.getElementById('tncDetailsBox');
  const cardTncCheck = document.getElementById('cardTncCheck');
  const payFromDetailBtn = document.getElementById('payFromDetailBtn');

  const realCards = document.querySelectorAll('.gs25-real-card');
  const detailCardGraphic = document.getElementById('detailCardGraphic');
  const detailCardCode = document.getElementById('detailCardCode');
  const detailInitialVal = document.getElementById('detailInitialVal');
  const detailCardRemaining = document.getElementById('detailCardRemaining');
  const detailTxnList = document.getElementById('detailTxnList');

  const showPosQrBtn = document.getElementById('showPosQrBtn');
  const posTopup100Btn = document.getElementById('posTopup100Btn');
  const posTopup200Btn = document.getElementById('posTopup200Btn');
  const posTopup300Btn = document.getElementById('posTopup300Btn');
  const posTopup500Btn = document.getElementById('posTopup500Btn');

  // Tủ Lạnh 25 DOM
  const tabMyStorage = document.getElementById('tabMyStorage');
  const tabMyGift = document.getElementById('tabMyGift');
  const panelMyStorage = document.getElementById('panelMyStorage');
  const panelMyGift = document.getElementById('panelMyGift');
  const myGiftsListContainer = document.getElementById('myGiftsListContainer');
  const myGiftBadge = document.getElementById('myGiftBadge');
  const fridgeBadgeCount = document.getElementById('fridgeBadgeCount');
  const tulanhUseBtns = document.querySelectorAll('.tulanh-use-btn');

  // Modals & Toast
  const rewardDetailModal = document.getElementById('rewardDetailModal');
  const closeRewardDetailModalBtn = document.getElementById('closeRewardDetailModalBtn');
  const confirmRedeemBtn = document.getElementById('confirmRedeemBtn');
  const detailHeroTitle = document.getElementById('detailHeroTitle');
  const detailExpDate = document.getElementById('detailExpDate');
  const detailItemTitle = document.getElementById('detailItemTitle');
  const detailPointBadge = document.getElementById('detailPointBadge');
  const detailUserPts = document.getElementById('detailUserPts');

  const payModal = document.getElementById('payModal');
  const openPayModalBtn = document.getElementById('openPayModalBtn');
  const closePayModalBtn = document.getElementById('closePayModalBtn');
  const closePayModalBtn2 = document.getElementById('closePayModalBtn2');
  const modalCardBalance = document.getElementById('modalCardBalance');
  const modalCardTitle = document.getElementById('modalCardTitle');

  const fridgeInfoModal = document.getElementById('fridgeInfoModal');
  const openFridgeInfoModalBtn = document.getElementById('openFridgeInfoModalBtn');
  const closeFridgeInfoModalBtn = document.getElementById('closeFridgeInfoModalBtn');
  const closeFridgeInfoModalBtn2 = document.getElementById('closeFridgeInfoModalBtn2');

  const txnModal = document.getElementById('txnModal');
  const openTxnHistoryBtn = document.getElementById('openTxnHistoryBtn');
  const closeTxnModalBtn = document.getElementById('closeTxnModalBtn');
  const txnList = document.getElementById('txnList');

  const toastNoti = document.getElementById('toastNoti');
  const toastMsg = document.getElementById('toastMsg');
  const qrCountdown = document.getElementById('qrCountdown');
  const refreshQrBtn = document.getElementById('refreshQrBtn');

  // --- INITIALIZATION ---
  init();

  function init() {
    setupNavigation();
    setupDealsAndNews();
    renderStampGrid();
    updateRewardButtons();
    renderTxnLogs();
    renderMyGifts();
    setupEventListeners();
    navigateToPage('home-screen');
  }

  // --- NAVIGATION & PAGE SWITCHING ---
  function setupNavigation() {
    topSwitchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        navigateToPage(target);
      });
    });

    bottomNavTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const navTarget = tab.dataset.nav;
        navigateToPage(navTarget);
      });
    });

    if (quickDealsBtn) quickDealsBtn.addEventListener('click', () => openRewardOrDealDetail('Kem Merino - Mua 2 tặng 1 cùng loại', null, 'Hạn đổi 30/6/25'));
    if (quickRewardsBtn) quickRewardsBtn.addEventListener('click', () => openRewardOrDealDetail('Tặng 2 chai TH True Tea', 400, 'Hạn đổi 30/6/25'));
    if (quickCardsBtn) quickCardsBtn.addEventListener('click', () => navigateToPage('egift-card'));
    if (seeAllDealsBtn) seeAllDealsBtn.addEventListener('click', () => showToast('Đang hiển thị toàn bộ Ưu đãi GS25'));
    if (seeAllRewardsBtn) seeAllRewardsBtn.addEventListener('click', () => showToast('Đang hiển thị toàn bộ Đổi điểm quà tặng'));
    if (openStampGameCard) openStampGameCard.addEventListener('click', () => navigateToPage('stamp-game'));

    if (backToHomeFromStamp) backToHomeFromStamp.addEventListener('click', () => navigateToPage('home-screen'));
    if (backToHomeFromCard) backToHomeFromCard.addEventListener('click', () => navigateToPage('home-screen'));
    if (backToHomeFromFridge) backToHomeFromFridge.addEventListener('click', () => navigateToPage('home-screen'));

    if (homeOpenQrBtn) homeOpenQrBtn.addEventListener('click', () => {
      openModal(payModal);
      startQrCountdown();
    });

    if (storageSeeAllBtn) storageSeeAllBtn.addEventListener('click', () => navigateToPage('tu-lanh'));
    if (storageUseBtn) storageUseBtn.addEventListener('click', () => {
      openModal(payModal);
      startQrCountdown();
    });

    if (viewPointsDetailBtn) viewPointsDetailBtn.addEventListener('click', () => showToast('Chi tiết điểm tích lũy: 9.500 điểm'));
  }

  function navigateToPage(pageId) {
    state.activePage = pageId;

    topSwitchBtns.forEach(b => {
      if (b.dataset.target === pageId) b.classList.add('active');
      else b.classList.remove('active');
    });

    bottomNavTabs.forEach(t => {
      if (t.dataset.nav === pageId) t.classList.add('active');
      else t.classList.remove('active');
    });

    appPages.forEach(page => {
      if (page.id === pageId) {
        page.classList.add('active');
        page.scrollTop = 0;
      } else {
        page.classList.remove('active');
      }
    });

    if (pageId === 'egift-card' && egiftCardListView && egiftCardDetailView) {
      // Stay on current view
    }
  }

  // --- DEALS & NEWS TAB SWITCHING & FILTERS ---
  function setupDealsAndNews() {
    if (tabDealsBtn && tabNewsBtn) {
      tabDealsBtn.addEventListener('click', () => {
        tabDealsBtn.classList.add('active');
        tabNewsBtn.classList.remove('active');
        dealsGridPanel.classList.add('active');
        newsGridPanel.classList.remove('active');
      });

      tabNewsBtn.addEventListener('click', () => {
        tabNewsBtn.classList.add('active');
        tabDealsBtn.classList.remove('active');
        newsGridPanel.classList.add('active');
        dealsGridPanel.classList.remove('active');
      });
    }

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        showToast(`Lọc danh sách: ${pill.textContent}`);
      });
    });
  }

  // --- REWARD & DEAL DETAILS MODAL ---
  function openRewardOrDealDetail(title, pts, exp = 'Hạn đổi 30/6/25') {
    state.currentDetail = { title, pts, exp };

    if (detailHeroTitle) detailHeroTitle.textContent = title.length > 18 ? title.substring(0, 18) + '...' : title;
    if (detailExpDate) detailExpDate.textContent = exp;
    if (detailItemTitle) detailItemTitle.textContent = title;
    if (detailUserPts) detailUserPts.textContent = `${state.userPoints.toLocaleString('vi-VN')} điểm`;

    if (pts) {
      detailPointBadge.style.display = 'inline-flex';
      detailPointBadge.innerHTML = `<i class="fa-solid fa-sun icon-star-gold"></i> <strong>${pts}</strong> điểm`;
      confirmRedeemBtn.textContent = 'Đổi ngay';
    } else {
      detailPointBadge.style.display = 'none';
      confirmRedeemBtn.textContent = 'Sử dụng';
    }

    openModal(rewardDetailModal);
  }

  // --- TỦ LẠNH 25 SEGMENT TAB SWITCHING ---
  function switchTulanhSegment(segment) {
    state.tulanhTab = segment;
    if (segment === 'storage') {
      tabMyStorage.classList.add('active');
      tabMyGift.classList.remove('active');
      panelMyStorage.classList.add('active');
      panelMyGift.classList.remove('active');
    } else {
      tabMyGift.classList.add('active');
      tabMyStorage.classList.remove('active');
      panelMyGift.classList.add('active');
      panelMyStorage.classList.remove('active');
    }
  }

  // --- STAMP GAME MECHANICS & INTEGRATION WITH TỦ LẠNH MY GIFT ---
  function renderStampGrid() {
    earnedStampsCount.textContent = state.userStamps;
    const progressPercent = Math.min(100, (state.userStamps / 9) * 100);
    stampProgressFill.style.width = `${progressPercent}%`;

    stampGrid.innerHTML = '';
    for (let i = 1; i <= 9; i++) {
      const isEarned = i <= state.userStamps;
      const slot = document.createElement('div');
      slot.className = `stamp-slot ${isEarned ? 'active' : ''}`;

      let iconHtml = '<i class="fa-solid fa-stamp stamp-icon"></i>';
      let badgeHtml = '';

      if (i === 4) {
        iconHtml = '<i class="fa-solid fa-coins stamp-icon"></i>';
        badgeHtml = '<span class="milestone-badge">500 Pts</span>';
      } else if (i === 6) {
        iconHtml = '<i class="fa-solid fa-mug-hot stamp-icon"></i>';
        badgeHtml = '<span class="milestone-badge">Trà Tắc</span>';
      } else if (i === 9) {
        iconHtml = '<i class="fa-solid fa-bowl-food stamp-icon"></i>';
        badgeHtml = '<span class="milestone-badge">Tteokbokki</span>';
      }

      slot.innerHTML = `
        <span class="slot-num">${i}</span>
        ${iconHtml}
        ${badgeHtml}
      `;
      stampGrid.appendChild(slot);
    }
  }

  function updateRewardButtons() {
    if (state.claimedRewards.includes(4)) {
      claimBtn4.className = 'claim-btn locked';
      claimBtn4.textContent = 'ĐÃ NHẬN';
      claimBtn4.disabled = true;
    } else if (state.userStamps >= 4) {
      claimBtn4.className = 'claim-btn';
      claimBtn4.textContent = 'ĐỔI QUÀ';
      claimBtn4.disabled = false;
    } else {
      claimBtn4.className = 'claim-btn locked';
      claimBtn4.textContent = 'CHƯA ĐỦ TEM';
      claimBtn4.disabled = true;
    }

    if (state.claimedRewards.includes(6)) {
      claimBtn6.className = 'claim-btn locked';
      claimBtn6.textContent = 'ĐÃ NHẬN';
      claimBtn6.disabled = true;
    } else if (state.userStamps >= 6) {
      claimBtn6.className = 'claim-btn';
      claimBtn6.textContent = 'ĐỔI QUÀ';
      claimBtn6.disabled = false;
    } else {
      claimBtn6.className = 'claim-btn locked';
      claimBtn6.textContent = 'CHƯA ĐỦ TEM';
      claimBtn6.disabled = true;
    }

    if (state.claimedRewards.includes(9)) {
      claimBtn9.className = 'claim-btn locked';
      claimBtn9.textContent = 'ĐÃ NHẬN';
      claimBtn9.disabled = true;
    } else if (state.userStamps >= 9) {
      claimBtn9.className = 'claim-btn';
      claimBtn9.textContent = 'ĐỔI QUÀ';
      claimBtn9.disabled = false;
    } else {
      claimBtn9.className = 'claim-btn locked';
      claimBtn9.textContent = 'CHƯA ĐỦ TEM';
      claimBtn9.disabled = true;
    }
  }

  function addStamp() {
    if (state.userStamps < 9) {
      state.userStamps++;
      renderStampGrid();
      updateRewardButtons();
      showToast(`Chúc mừng! Bạn đã tích thêm +1 Tem (Tổng: ${state.userStamps}/9)`);
    } else {
      showToast('Bạn đã đạt tối đa 9 tem của tháng này!');
    }
  }

  function claimReward(milestone, title, val) {
    if (state.userStamps >= milestone && !state.claimedRewards.includes(milestone)) {
      state.claimedRewards.push(milestone);
      updateRewardButtons();

      // DYNAMICALLY ADD CLAIMED REWARD TO TỦ LẠNH -> MY GIFT
      const newGift = {
        id: Date.now(),
        title: `Quà Tem GS25: ${title} (${val})`,
        exp: 'Hạn đổi 31/8/26',
        bgClass: 'stamp-earned-bg',
        tag: 'GAME TEM',
        subTitle: `THƯỞNG ${milestone} TEM`
      };

      state.myGifts.unshift(newGift);
      renderMyGifts();

      showToast(`Đã đổi thành công "${title}"! Quà đã tự động thêm vào Tủ Lạnh -> My Gift.`);
    }
  }

  // --- RENDER MY GIFTS IN TỦ LẠNH 25 ---
  function renderMyGifts() {
    if (!myGiftsListContainer) return;
    myGiftsListContainer.innerHTML = '';

    const giftCount = state.myGifts.length;
    if (myGiftBadge) myGiftBadge.textContent = giftCount;
    if (fridgeBadgeCount) fridgeBadgeCount.textContent = giftCount + 3; // Total storage + gifts

    state.myGifts.forEach(gift => {
      const card = document.createElement('div');
      card.className = 'my-gift-card-v';

      card.innerHTML = `
        <div class="gift-img-box ${gift.bgClass}">
          <span class="poster-tag">${gift.tag}</span>
          <span class="poster-sub-title">${gift.subTitle}</span>
        </div>
        <div class="gift-content">
          <div class="gift-exp-pill"><i class="fa-regular fa-clock"></i> ${gift.exp}</div>
          <h4 class="gift-item-title">${gift.title}</h4>
          <button class="gift-claim-action-btn" data-title="${gift.title}">Lấy ngay</button>
        </div>
      `;

      const claimBtn = card.querySelector('.gift-claim-action-btn');
      claimBtn.addEventListener('click', () => {
        if (modalCardTitle) modalCardTitle.textContent = gift.title;
        openModal(payModal);
        startQrCountdown();
        showToast(`Đã chọn quà: "${gift.title}". Đưa QR cho Thu ngân tại quầy!`);
      });

      myGiftsListContainer.appendChild(card);
    });
  }

  // --- E-GIFT CARD DETAILED FLOW & MECHANICS ---
  function selectCard(cardElement) {
    realCards.forEach(c => c.classList.remove('active'));
    cardElement.classList.add('active');

    state.selectedCardId = cardElement.dataset.cardid;
    state.selectedCardName = cardElement.dataset.name || 'GS25 Standard';
    const cardVal = parseInt(cardElement.dataset.val);

    if (cardElement.classList.contains('green-card')) state.cardHeroClass = 'green-hero';
    else if (cardElement.classList.contains('pink-card')) state.cardHeroClass = 'pink-hero';
    else if (cardElement.classList.contains('premium-gold-card')) state.cardHeroClass = 'gold-hero';
    else state.cardHeroClass = 'black-hero';

    state.cardBalance = cardVal === 500000 ? 520000 : cardVal;

    updateCardDetailViewDOM(cardVal);
    openCardDetailView();
  }

  function updateCardDetailViewDOM(initialVal = 200000) {
    if (detailCardGraphic) {
      detailCardGraphic.className = `detail-card-hero ${state.cardHeroClass}`;
    }
    if (detailCardCode) {
      detailCardCode.textContent = `*****${state.selectedCardId.substring(2)}`;
    }
    if (detailInitialVal) {
      detailInitialVal.textContent = `${initialVal.toLocaleString('vi-VN')}đ`;
    }
    if (detailCardRemaining) {
      detailCardRemaining.textContent = `${state.cardBalance.toLocaleString('vi-VN')}đ`;
    }
    if (modalCardBalance) {
      modalCardBalance.textContent = `${state.cardBalance.toLocaleString('vi-VN')}đ`;
    }
  }

  function openCardDetailView() {
    if (egiftCardListView && egiftCardDetailView) {
      egiftCardListView.style.display = 'none';
      egiftCardDetailView.style.display = 'block';
      egiftCardDetailView.scrollTop = 0;
    }
  }

  function closeCardDetailView() {
    if (egiftCardListView && egiftCardDetailView) {
      egiftCardDetailView.style.display = 'none';
      egiftCardListView.style.display = 'block';
    }
  }

  function topupCardPos(amount, bonusPercent = 0) {
    const bonus = amount * bonusPercent;
    const totalAdded = amount + bonus;
    state.cardBalance += totalAdded;

    if (modalCardBalance) modalCardBalance.textContent = `${state.cardBalance.toLocaleString('vi-VN')}đ`;
    if (detailCardRemaining) detailCardRemaining.textContent = `${state.cardBalance.toLocaleString('vi-VN')}đ`;

    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2,'0')}/${(now.getMonth()+1).toString().padStart(2,'0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;

    state.txnLogs.unshift({
      type: 'credit',
      title: `Nạp tiền tại POS GS25 +${amount.toLocaleString('vi-VN')}đ ${bonus > 0 ? '(+' + bonus.toLocaleString('vi-VN') + 'đ Bonus)' : ''}`,
      date: dateStr,
      amount: totalAdded
    });

    renderTxnLogs();
    showToast(`Thu ngân POS đã nạp thành công ${totalAdded.toLocaleString('vi-VN')}đ vào Thẻ E-Gift!`);
  }

  function renderTxnLogs() {
    if (!txnList) return;
    txnList.innerHTML = '';
    state.txnLogs.forEach(log => {
      const li = document.createElement('li');
      li.className = `txn-item ${log.type}`;

      const iconClass = log.type === 'credit' ? 'fa-plus' : 'fa-minus';
      const amountPrefix = log.type === 'credit' ? '+' : '';

      li.innerHTML = `
        <div class="t-icon"><i class="fa-solid ${iconClass}"></i></div>
        <div class="t-details">
          <strong>${log.title}</strong>
          <small>${log.date}</small>
        </div>
        <div class="t-amount ${log.type}">${amountPrefix}${log.amount.toLocaleString('vi-VN')}đ</div>
      `;
      txnList.appendChild(li);
    });

    // Also update detailTxnList in Card Detail View
    if (detailTxnList && state.txnLogs.length > 0) {
      const firstLog = state.txnLogs[0];
      detailTxnList.innerHTML = `
        <div class="detail-txn-card">
          <div class="txn-card-header">
            <strong>${firstLog.title}</strong>
            <span class="txn-amount ${firstLog.type}">${firstLog.type === 'credit' ? '+' : ''}${firstLog.amount.toLocaleString('vi-VN')}đ</span>
          </div>
          <div class="txn-meta-row">
            <span>${firstLog.date}</span>
            <span>GS25 106 Nguyen Gian Thanh</span>
          </div>
          <div class="txn-code-bar">
            <i class="fa-solid fa-receipt"></i>
            <span>e124bdj-23jjkfnk-kj2b31k-nmmvva12</span>
          </div>
          <button class="txn-detail-btn">Xem chi tiết</button>
        </div>
      `;
    }
  }

  // --- POS QR COUNTDOWN TIMER ---
  function startQrCountdown() {
    state.qrTimeLeft = 15;
    if (qrCountdown) qrCountdown.textContent = '00:15s';

    if (state.qrTimerInterval) clearInterval(state.qrTimerInterval);

    state.qrTimerInterval = setInterval(() => {
      state.qrTimeLeft--;
      if (state.qrTimeLeft <= 0) {
        clearInterval(state.qrTimerInterval);
        if (qrCountdown) qrCountdown.textContent = '00:00s (Hết hạn)';
      } else {
        const sec = state.qrTimeLeft.toString().padStart(2, '0');
        if (qrCountdown) qrCountdown.textContent = `00:${sec}s`;
      }
    }, 1000);
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    // Floating Widget
    if (closeFloatingWidgetBtn) {
      closeFloatingWidgetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        floatingPromoWidget.style.display = 'none';
      });
    }

    if (openFloatingQrBtn) {
      openFloatingQrBtn.addEventListener('click', () => {
        openModal(payModal);
        startQrCountdown();
      });
    }

    // Deal and Reward Cards click -> open Reward/Deal Details Modal
    document.querySelectorAll('.deal-card-gs, .reward-card-gs, .grid-card-gs').forEach(card => {
      card.addEventListener('click', () => {
        const title = card.dataset.deal || card.dataset.reward || card.dataset.title || 'Ưu đãi đặc biệt GS25';
        const pts = card.dataset.pts ? parseInt(card.dataset.pts) : null;
        openRewardOrDealDetail(title, pts);
      });
    });

    if (confirmRedeemBtn) {
      confirmRedeemBtn.addEventListener('click', () => {
        closeModal(rewardDetailModal);
        openModal(payModal);
        startQrCountdown();
        showToast(`Đã chọn "${state.currentDetail ? state.currentDetail.title : 'Ưu đãi'}". Hãy đưa QR cho Thu ngân!`);
      });
    }

    // Tủ Lạnh 25 Tab Switching
    if (tabMyStorage) tabMyStorage.addEventListener('click', () => switchTulanhSegment('storage'));
    if (tabMyGift) tabMyGift.addEventListener('click', () => switchTulanhSegment('gift'));

    tulanhUseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.dataset.item;
        if (modalCardTitle) modalCardTitle.textContent = `VOUCHER: ${item}`;
        openModal(payModal);
        startQrCountdown();
        showToast(`Đưa mã QR cho Thu ngân để nhận món "${item}"!`);
      });
    });

    // Stamp Game Demo Actions
    if (simPurchaseBtn) simPurchaseBtn.addEventListener('click', () => addStamp());
    if (simMissionBtn) simMissionBtn.addEventListener('click', () => addStamp());
    if (simResetStampsBtn) simResetStampsBtn.addEventListener('click', () => {
      state.userStamps = 0;
      state.claimedRewards = [];
      renderStampGrid();
      updateRewardButtons();
      showToast('Đã reset lại tiến trình tem tích lũy!');
    });

    if (claimBtn4) claimBtn4.addEventListener('click', () => claimReward(4, '500 Loyalty Points', '5.000đ'));
    if (claimBtn6) claimBtn6.addEventListener('click', () => claimReward(6, '1 Cốc Trà Tắc GS25 0đ', '20.000đ'));
    if (claimBtn9) claimBtn9.addEventListener('click', () => claimReward(9, '1 Suất Tteokbokki/Combo FF 0đ', '40.000đ'));

    // E-Gift Card Actions & Navigation
    realCards.forEach(card => card.addEventListener('click', () => selectCard(card)));

    if (openCardDetailDirectBtn) {
      openCardDetailDirectBtn.addEventListener('click', () => {
        updateCardDetailViewDOM(200000);
        openCardDetailView();
      });
    }

    if (backToCardCatalogBtn) {
      backToCardCatalogBtn.addEventListener('click', () => closeCardDetailView());
    }

    if (scrollToTncBtn && tncDetailsBox) {
      scrollToTncBtn.addEventListener('click', () => {
        tncDetailsBox.scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (cardTncCheck && payFromDetailBtn) {
      cardTncCheck.addEventListener('change', () => {
        payFromDetailBtn.disabled = !cardTncCheck.checked;
        payFromDetailBtn.style.opacity = cardTncCheck.checked ? '1' : '0.5';
      });
    }

    if (payFromDetailBtn) {
      payFromDetailBtn.addEventListener('click', () => {
        if (modalCardTitle) modalCardTitle.textContent = `THẺ E-GIFT: ${state.selectedCardName}`;
        openModal(payModal);
        startQrCountdown();
      });
    }

    if (openPayModalBtn) openPayModalBtn.addEventListener('click', () => { openModal(payModal); startQrCountdown(); });
    if (closePayModalBtn) closePayModalBtn.addEventListener('click', () => closeModal(payModal));
    if (closePayModalBtn2) closePayModalBtn2.addEventListener('click', () => closeModal(payModal));

    if (showPosQrBtn) showPosQrBtn.addEventListener('click', () => { openModal(payModal); startQrCountdown(); });

    if (posTopup100Btn) posTopup100Btn.addEventListener('click', () => topupCardPos(100000));
    if (posTopup200Btn) posTopup200Btn.addEventListener('click', () => topupCardPos(200000));
    if (posTopup300Btn) posTopup300Btn.addEventListener('click', () => topupCardPos(300000));
    if (posTopup500Btn) posTopup500Btn.addEventListener('click', () => topupCardPos(500000, 0.04));

    if (openFridgeInfoModalBtn) openFridgeInfoModalBtn.addEventListener('click', () => openModal(fridgeInfoModal));
    if (closeFridgeInfoModalBtn) closeFridgeInfoModalBtn.addEventListener('click', () => closeModal(fridgeInfoModal));
    if (closeFridgeInfoModalBtn2) closeFridgeInfoModalBtn2.addEventListener('click', () => closeModal(fridgeInfoModal));

    if (openTxnHistoryBtn) openTxnHistoryBtn.addEventListener('click', () => openModal(txnModal));
    if (closeTxnModalBtn) closeTxnModalBtn.addEventListener('click', () => closeModal(txnModal));

    if (closeRewardDetailModalBtn) closeRewardDetailModalBtn.addEventListener('click', () => closeModal(rewardDetailModal));

    if (refreshQrBtn) refreshQrBtn.addEventListener('click', () => {
      startQrCountdown();
      showToast('Đã làm mới mã QR thanh toán!');
    });
  }

  // --- MODAL & TOAST HELPERS ---
  function openModal(modalEl) {
    if (modalEl) modalEl.classList.add('active');
  }

  function closeModal(modalEl) {
    if (modalEl) modalEl.classList.remove('active');
  }

  function showToast(msg) {
    if (!toastNoti || !toastMsg) return;
    toastMsg.textContent = msg;
    toastNoti.classList.add('show');
    setTimeout(() => {
      toastNoti.classList.remove('show');
    }, 3000);
  }

});
