            let canvas, ctx, w, h
            const $ = document.querySelector.bind(document)
    
            let timestart = 0;
            const draw = (timestamp) => {
                if (!timestart) {
                    timestart = timestamp
                }
    
                const time = timestamp - timestart
                ctx.fillStyle = `hsla(${time/20},100%,50%,0.0125)`
                ctx.fillRect(0, 0, w, h)
                ctx.strokeStyle = "black"
                const radius = w / 10
                const cx = w / 2
                const cy = h / 2
                const phase2 = (time / 2000 * radius) > radius * 4
                for (let angle = Math.PI / 6; angle < Math.PI * 4; angle += Math.PI / 3) {
                    let distance = time / 2000 * radius
                    const outer = angle > Math.PI * 2
                    distance = distance < radius * 2 * (1 + outer) ?
                        distance : radius * 2 * (1 + outer)
                    ctx.beginPath()
                    const dx = Math.cos(angle) * distance
                    const dy = Math.sin(angle) * distance
                    ctx.arc(cx + dx, cy + dy, radius, 0, Math.PI * 2)
                    ctx.stroke()
                }
                ctx.beginPath()
                ctx.arc(cx, cy, radius, 0, Math.PI * 2)
                ctx.stroke()
                if (phase2) {
                    let k = ((time / 2000 * radius) - radius * 4) / (radius * 4)
                    if (k > 1) k = 1
                    for (let angle = Math.PI / 6; angle < Math.PI * 4; angle += Math.PI / 3) {
    
                        const outerDistance = radius * 4
                        const innerDistance = radius * (4 - 2 * k)
    
    
                        const dx = Math.cos(angle) * outerDistance
                        const dy = Math.sin(angle) * outerDistance
                        for (let angle2 = Math.PI / 6; angle2 < Math.PI * 4; angle2 += Math.PI / 3) {
    
                            const dx2 = Math.cos(angle2) * innerDistance
                            const dy2 = Math.sin(angle2) * innerDistance
                            ctx.beginPath()
                            ctx.moveTo(cx + dx, cy + dy)
                            ctx.lineTo(cx + dx2, cy + dy2)
                            ctx.stroke()
                        }
                        const dx2 = Math.cos(angle - Math.PI / 3) * outerDistance * k
                        const dy2 = Math.sin(angle - Math.PI / 3) * outerDistance * k
                        ctx.beginPath()
                        ctx.moveTo(cx + dx, cy + dy)
                        ctx.lineTo(cx + (dx2), cy + (dy2))
                        ctx.stroke()
                        const dx3 = Math.cos(angle + Math.PI / 3) * outerDistance * k
                        const dy3 = Math.sin(angle + Math.PI / 3) * outerDistance * k
                        ctx.beginPath()
                        ctx.moveTo(cx + dx, cy + dy)
                        ctx.lineTo(cx + (dx3), cy + (dy3))
                        ctx.stroke()
                    }
                    for (let angle = Math.PI / 6; angle < Math.PI * 4; angle += Math.PI / 3) {
                        const dx = Math.cos(angle) * radius * 2 * k
                        const dy = Math.sin(angle) * radius * 2 * k
                        const dx2 = Math.cos(angle + Math.PI / 3) * radius * 2 * k
                        const dy2 = Math.sin(angle + Math.PI / 3) * radius * 2 * k
                        ctx.beginPath()
                        ctx.moveTo(cx + dx, cy + dy)
                        ctx.lineTo(cx + (dx2), cy + (dy2))
                        ctx.stroke()
                        for (let angle2 = Math.PI / 6; angle2 < Math.PI * 4; angle2 += Math.PI / 3) {
    
                            const dx3 = Math.cos(angle2) * 2 * radius
                            const dy3 = Math.sin(angle2) * 2 * radius
                            ctx.beginPath()
                            ctx.moveTo(cx + dx, cy + dy)
                            ctx.lineTo(cx + dx3, cy + dy3)
                            ctx.stroke()
    
                        }
                    }
                    if (k >= 1) {
                        timestart = 0
                        setTimeout(draw, 20 * 4 * radius)
                        return
                    }
                }
                requestAnimationFrame(draw)
            }
    
            const start = () => {
                canvas = $("canvas")
                canvas.width = w = innerWidth * 2
                canvas.height = h = innerHeight * 2
                ctx = canvas.getContext("2d")
                ctx.lineWidth = 2
                requestAnimationFrame(draw)
            }
            onload = start
