// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호 Down
// 랜덤번호가 > 유저번호 Up
// reset 버튼을 누르면 게임이 리셋
// 5번의 기회를 다 쓰면 게임이 끝난다
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다 기회를 깎지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깎지 않는다


let computerNum = 0
let playButton = document.getElementById("play-button")
let userInput = document.querySelector("#user-input")
let resultAreaImg = document.querySelector(".main-img")
let resultText = document.querySelector(".result-text")
let resetButton = document.querySelector(".button-reset")
let chances = 5
let gameOver = false
let chanceArea = document.getElementById("chance-area")
let history = []

chanceArea.innerHTML = `남은 기회 ${chances}번 남았어.`
playButton.addEventListener('click', play)
resetButton.addEventListener('click', reset)
userInput.addEventListener("focus", function () { userInput.value = "" })

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1
  console.log("정답", computerNum)
}
pickRandomNum()

function play() {
  const userValue = userInput.value

  if (userValue < 1 || userValue > 100) {
    resultText.textContent = "1과100사이 숫자를 입력해주세요"
    return
  }
  if (history.includes(userValue)) {
    resultText.textContent = "이미 입력한 숫자에요"
    return
  }
  chances--
  chanceArea.innerHTML = `남은 기회 ${chances}번 남았어.`
  history.push(userValue)

  if (userValue < computerNum) {
    resultAreaImg.src = "./image/반전.gif"
    resultText.textContent = "Up!"
  } else if (userValue > computerNum) {
    resultAreaImg.src = "./image/너의 이름은 움짤07.gif"
    resultText.textContent = "Down!"
  } else {
    resultAreaImg.src = "./image/너의 이름은 움짤12.gif"
    resultText.textContent = "정답!"
    chanceArea.innerHTML = ""
    gameOver = true
  }

  if (chances == 0) {
    if (userValue != computerNum) {
      resultAreaImg.src = "./image/너의 이름은 움짤06.gif"
      resultText.textContent = `정답은 ${computerNum}`
      chanceArea.innerHTML = "끝났어"
      gameOver = true
    }
    gameOver = true

  }
  if (gameOver == true) {
    playButton.disabled = true
  }
}

function reset() {
  // user input창이 깨끗하게 정리되고
  userInput.value = ""
  // 새로운 번호가 생성
  pickRandomNum()
  // 메인 사진 출력
  resultAreaImg.src = "./image/너의 이름은 움짤19.gif"
  resultText.textContent = "찾아줄 거지?"
  // go버튼 활성화
  gameOver = false
  playButton.disabled = false
  // 남은 기회 5번으로 초기화
  chances = 5
  chanceArea.innerHTML = `남은 기회 ${chances}번 남았어.`
  // 배열값 초기화
  history = []

}