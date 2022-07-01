@testable
class MyShow {}

function testable(target) {
  target.isTestable = true
}

console.log(MyShow.isTestable)
