// ThisType 用于指定 this 的类型
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>;  // Type of 'this' in methods is D & M
}

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
      moveBy(dx: number, dy: number) {
        // 这里的 x,y 本来不应能取到，但是 makeObject 做了一些处理，最后能够取到
        // typescript不能识别这种情况，这时可以使用 ThisType 指定this的类型        
        this.x += dx;  // Strongly typed this
        this.y += dy;  // Strongly typed this
      }
  }
});

obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);