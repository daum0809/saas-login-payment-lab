// Phase 1: UI flow only.
// Next: connect Supabase Google OAuth and store usage in lab_ tables.

let signedIn = false;
let freeUses = 2;

const loginButton = document.querySelector("#googleLogin");
const status = document.querySelector("#loginStatus");
const useButton = document.querySelector("#useService");
const freeCount = document.querySelector("#freeCount");
const paywall = document.querySelector("#paywall");
const payButton = document.querySelector("#payButton");

loginButton.addEventListener("click", () => {
  // Placeholder. We will replace this with Supabase signInWithOAuth({ provider: "google" }).
  signedIn = true;
  status.textContent = "실습 모드: 로그인 연결 준비 완료";
  useButton.disabled = false;
});

useButton.addEventListener("click", () => {
  if (!signedIn || freeUses <= 0) return;
  freeUses -= 1;
  freeCount.textContent = String(freeUses);

  if (freeUses === 0) {
    useButton.disabled = true;
    paywall.hidden = false;
  }
});

payButton.addEventListener("click", () => {
  alert("다음 단계에서 Toss Payments 테스트 결제를 연결합니다.");
});
