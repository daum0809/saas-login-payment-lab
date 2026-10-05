const SUPABASE_URL = "https://hfqjtbzoncirzzcxswra.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "PASTE_SUPABASE_PUBLISHABLE_KEY_HERE";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const loginButton = document.querySelector("#googleLogin");
const logoutButton = document.querySelector("#logoutButton");
const status = document.querySelector("#loginStatus");
const useButton = document.querySelector("#useService");
const freeCount = document.querySelector("#freeCount");
const paywall = document.querySelector("#paywall");
const payButton = document.querySelector("#payButton");

let freeUses = 2;

async function refreshUser() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (user) {
    status.textContent = `로그인됨: ${user.email ?? "Google 사용자"}`;
    loginButton.hidden = true;
    logoutButton.hidden = false;
    useButton.disabled = false;
  } else {
    status.textContent = "아직 로그인하지 않았습니다.";
    loginButton.hidden = false;
    logoutButton.hidden = true;
    useButton.disabled = true;
  }
}

loginButton.addEventListener("click", async () => {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: window.location.origin + window.location.pathname }
  });
  if (error) status.textContent = "로그인 오류: " + error.message;
});

logoutButton.addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  await refreshUser();
});

useButton.addEventListener("click", () => {
  if (freeUses <= 0) return;
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

supabaseClient.auth.onAuthStateChange(() => refreshUser());
refreshUser();
