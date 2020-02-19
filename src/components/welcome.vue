<template>
    <div class="sky" ref="sky">
        <canvas class="canvas" ref="canvas"> </canvas>
        <h3>WELCOME</h3>
    </div>
</template>
<script>
export default {
  mounted () {
    let _this = this
    _this.$refs.sky.width = window.innerWidth
    _this.$refs.sky.height = window.innerHeight
    function Star (id, x, y) {
      this.id = id
      this.x = x
      this.y = y
      this.r = Math.floor(Math.random() * 2) + 1
      var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2
      this.color = 'rgba(255,255,255,' + alpha + ')'
    }
    Star.prototype.draw = function () {
      ctx.fillStyle = this.color
      ctx.shadowBlur = this.r * 2
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
      ctx.closePath()
      ctx.fill()
    }
    Star.prototype.move = function () {
      this.y -= 1
      if (this.y <= -10) this.y = _Height + 10
      this.draw()
    }
    Star.prototype.die = function () {
      stars[this.id] = null
      delete stars[this.id]
    }
    var canvas = _this.$refs.canvas
    var ctx = canvas.getContext('2d')
    var _Width = _this.$refs.sky.width
    var _Height = _this.$refs.sky.height
    var stars = []
    var initStarsPopulation = 80
    setCanvasSize()
    _init_()
    function setCanvasSize () {
      canvas.setAttribute('width', _Width)
      canvas.setAttribute('height', _Height)
    }
    function _init_ () {
      ctx.strokeStyle = 'white'
      ctx.shadowColor = 'white'
      for (var i = 0; i < initStarsPopulation; i++) {
        stars[i] = new Star(i, Math.floor(Math.random() * _Width), Math.floor(Math.random() * _Height))
      }
      ctx.shadowBlur = 0
      animate()
    }
    function animate () {
      ctx.clearRect(0, 0, _Width, _Height)
      for (var i in stars) {
        stars[i].move()
      }
      requestAnimationFrame(animate)
    }
  }

}
</script>
<style lang="less" scoped>

.sky{
  width: 100%;
  height:100%;
  background:radial-gradient(220% 105% at bottom center,#1b2947 10%,#3f4085 30%,#b945b9 55%,#1b2947);
  position:relative;
}
.canvas{
  width: 100%;
  height:100%;
}
h3{
  text-align: center;
  color:rgb(19, 17, 17);
  margin:0;
  padding:0;
  font-size:6em;
  font-family: sans-serif;
  position:absolute;
  left:50%;
  top:50%;
  margin:-63.2px 0 0 -253.7625px;
}

</style>
