// exercise 1
var p = 0.4
var RW = function (x)
{
  return (x == 0) ? 0: (flip(p) ? RW(x-1) : RW(x+1))
}
var y = 6
var RW_from_y = function() {return RW(y)}
RW_from_y()