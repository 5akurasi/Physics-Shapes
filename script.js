const { Engine, Render, World, Bodies, Events } = Matter;

// Создаем движок и рендер
const engine = Engine.create();
const render = Render.create({
    element: document.getElementById('world'),
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false
    }
});

// Запускаем рендер
Render.run(render);
Engine.run(engine);

// Обработчик клика для создания фигур
document.body.addEventListener('click', (event) => {
    const size = 50;
    const x = event.clientX;
    const y = event.clientY;

    // Создание случайной фигуры
    const shapeType = Math.floor(Math.random() * 3);
    let shape;
    
    if (shapeType === 0) { // Квадрат
        shape = Bodies.rectangle(x, y, size, size, { restitution: 0.8, friction: 0.1 });
    } else if (shapeType === 1) { // Круг
        shape = Bodies.circle(x, y, size / 2, { restitution: 0.8, friction: 0.1 });
    } else { // Треугольник
        shape = Bodies.polygon(x, y, 3, size / 2, { restitution: 0.8, friction: 0.1 });
    }

    World.add(engine.world, shape);
});

// Удаляем элементы, если они выходят за пределы экрана
Events.on(engine, 'afterUpdate', () => {
    World.allBodies(engine.world).forEach(body => {
        if (body.position.y > window.innerHeight || body.position.x < 0 || body.position.x > window.innerWidth) {
            World.remove(engine.world, body);
        }
    });
});