/**
 * House of Algo's - Enhanced Section Background Animations
 * This file contains all the animations for the different sections of the website
 * with enhanced trading-themed visual effects
 */

// Import Three.js library
import * as THREE from "three"
import { gsap } from "gsap"

// Initialize all animations when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize animations for each section
  initAboutAnimation()
  initVisionAnimation()
  initMissionAnimation()
  initEarnAnimation()
  initFeaturesAnimation()
  initFaqAnimation()
  initContactAnimation()
  initDisclaimerAnimation()
})

/**
 * About Us Section - Enhanced Trading Network Visualization
 * Creates a network of connected nodes with trading data streams
 */
function initAboutAnimation() {
  const aboutSection = document.querySelector(".about")
  if (!aboutSection) return

  // Create canvas for network animation if it doesn't exist
  let networkCanvas = aboutSection.querySelector(".network-animation")
  if (!networkCanvas) {
    networkCanvas = document.createElement("canvas")
    networkCanvas.classList.add("network-animation")
    aboutSection.appendChild(networkCanvas)
  }

  // Set up Three.js scene
  const renderer = new THREE.WebGLRenderer({
    canvas: networkCanvas,
    alpha: true,
    antialias: true,
  })

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, aboutSection.clientWidth / aboutSection.clientHeight, 0.1, 1000)
  camera.position.z = 5

  // Resize handler
  function handleResize() {
    const width = aboutSection.clientWidth
    const height = aboutSection.clientHeight
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  window.addEventListener("resize", handleResize)
  handleResize()

  // Create nodes and connections
  const nodesGroup = new THREE.Group()
  scene.add(nodesGroup)

  const nodeCount = 40 // Increased node count
  const nodes = []

  // Create different node types (representing different trading entities)
  const nodeGeometry = new THREE.SphereGeometry(0.05, 16, 16)
  const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 })
  const exchangeNodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff })
  const brokerNodeMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff })

  // Create nodes
  for (let i = 0; i < nodeCount; i++) {
    // Choose material based on node type
    let material
    if (i % 10 === 0) {
      material = exchangeNodeMaterial // Exchange nodes
    } else if (i % 5 === 0) {
      material = brokerNodeMaterial // Broker nodes
    } else {
      material = nodeMaterial // Regular trader nodes
    }

    const node = new THREE.Mesh(nodeGeometry, material)
    node.position.x = (Math.random() - 0.5) * 10
    node.position.y = (Math.random() - 0.5) * 5
    node.position.z = (Math.random() - 0.5) * 5
    node.userData = {
      vx: (Math.random() - 0.5) * 0.01,
      vy: (Math.random() - 0.5) * 0.01,
      vz: (Math.random() - 0.5) * 0.01,
      type: i % 10 === 0 ? "exchange" : i % 5 === 0 ? "broker" : "trader",
      size: i % 10 === 0 ? 0.12 : i % 5 === 0 ? 0.08 : 0.05,
    }

    // Set size based on node type
    node.scale.set(node.userData.size / 0.05, node.userData.size / 0.05, node.userData.size / 0.05)

    nodes.push(node)
    nodesGroup.add(node)
  }

  // Create connections between nodes
  const connections = []
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xffd700,
    transparent: true,
    opacity: 0.2,
  })

  const dataStreamMaterial = new THREE.LineBasicMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.5,
  })

  // Connect nodes with preference to exchange and broker nodes
  for (let i = 0; i < nodeCount; i++) {
    // Exchange nodes connect to many others
    if (nodes[i].userData.type === "exchange") {
      for (let j = 0; j < nodeCount; j++) {
        if (i !== j && Math.random() > 0.7) {
          const geometry = new THREE.BufferGeometry()
          const linePositions = new Float32Array(6) // 2 points * 3 coordinates
          geometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3))

          const line = new THREE.Line(geometry, dataStreamMaterial)
          line.userData = {
            fromIndex: i,
            toIndex: j,
            isDataStream: true,
            pulseSpeed: Math.random() * 0.5 + 0.5,
            pulseOffset: Math.random() * Math.PI * 2,
          }
          connections.push(line)
          scene.add(line)
        }
      }
    }
    // Broker nodes connect to several traders
    else if (nodes[i].userData.type === "broker") {
      for (let j = 0; j < nodeCount; j++) {
        if (i !== j && nodes[j].userData.type === "trader" && Math.random() > 0.6) {
          const geometry = new THREE.BufferGeometry()
          const linePositions = new Float32Array(6) // 2 points * 3 coordinates
          geometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3))

          const line = new THREE.Line(geometry, lineMaterial)
          line.userData = {
            fromIndex: i,
            toIndex: j,
            isDataStream: Math.random() > 0.5,
          }
          connections.push(line)
          scene.add(line)
        }
      }
    }
    // Regular traders connect to a few others
    else {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() > 0.9) {
          const geometry = new THREE.BufferGeometry()
          const linePositions = new Float32Array(6) // 2 points * 3 coordinates
          geometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3))

          const line = new THREE.Line(geometry, lineMaterial)
          line.userData = {
            fromIndex: i,
            toIndex: j,
            isDataStream: false,
          }
          connections.push(line)
          scene.add(line)
        }
      }
    }
  }

  // Create data packets that travel along connections
  const dataPackets = []
  const packetGeometry = new THREE.SphereGeometry(0.03, 8, 8)
  const packetMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.8,
  })

  // Create data packets on data stream connections
  connections.forEach((connection, index) => {
    if (connection.userData.isDataStream && Math.random() > 0.5) {
      const packet = new THREE.Mesh(packetGeometry, packetMaterial)
      packet.userData = {
        connectionIndex: index,
        progress: 0,
        speed: Math.random() * 0.01 + 0.005,
      }
      dataPackets.push(packet)
      scene.add(packet)
    }
  })

  // Animation loop
  function animate() {
    requestAnimationFrame(animate)

    const time = Date.now() * 0.001

    // Update node positions
    nodes.forEach((node) => {
      node.position.x += node.userData.vx
      node.position.y += node.userData.vy
      node.position.z += node.userData.vz

      // Bounce off boundaries
      if (Math.abs(node.position.x) > 5) node.userData.vx *= -1
      if (Math.abs(node.position.y) > 2.5) node.userData.vy *= -1
      if (Math.abs(node.position.z) > 2.5) node.userData.vz *= -1

      // Pulse exchange and broker nodes
      if (node.userData.type === "exchange" || node.userData.type === "broker") {
        const scale = (node.userData.size / 0.05) * (1 + 0.2 * Math.sin(time * 2 + node.position.x))
        node.scale.set(scale, scale, scale)
      }
    })

    // Update connections
    connections.forEach((line, index) => {
      const fromNode = nodes[line.userData.fromIndex]
      const toNode = nodes[line.userData.toIndex]

      const positions = line.geometry.attributes.position.array

      positions[0] = fromNode.position.x
      positions[1] = fromNode.position.y
      positions[2] = fromNode.position.z

      positions[3] = toNode.position.x
      positions[4] = toNode.position.y
      positions[5] = toNode.position.z

      line.geometry.attributes.position.needsUpdate = true

      // Calculate distance for opacity
      const dx = positions[0] - positions[3]
      const dy = positions[1] - positions[4]
      const dz = positions[2] - positions[5]
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

      // Fade out connections that are too far
      line.material.opacity = Math.max(0, 0.5 - distance / 10)

      // Pulse data stream connections
      if (line.userData.isDataStream) {
        const pulseValue = 0.3 + 0.3 * Math.sin(time * line.userData.pulseSpeed + line.userData.pulseOffset)
        line.material.opacity = pulseValue
      }
    })

    // Update data packets
    dataPackets.forEach((packet) => {
      packet.userData.progress += packet.userData.speed

      // Reset when reaching the end
      if (packet.userData.progress > 1) {
        packet.userData.progress = 0
      }

      // Get the connection this packet travels on
      const connection = connections[packet.userData.connectionIndex]
      const positions = connection.geometry.attributes.position.array

      // Interpolate position along the connection
      packet.position.x = positions[0] + (positions[3] - positions[0]) * packet.userData.progress
      packet.position.y = positions[1] + (positions[4] - positions[1]) * packet.userData.progress
      packet.position.z = positions[2] + (positions[5] - positions[2]) * packet.userData.progress

      // Pulse the packet
      const scale = 1 + 0.3 * Math.sin(time * 5 + packet.userData.progress * 10)
      packet.scale.set(scale, scale, scale)
    })

    // Rotate the entire group slowly
    nodesGroup.rotation.y += 0.001

    renderer.render(scene, camera)
  }

  animate()
}

/**
 * Vision Section - Enhanced 3D Trading Chart Animation
 * Creates a 3D grid with dynamic trading chart elements
 */
function initVisionAnimation() {
  const visionSection = document.querySelector(".vision")
  if (!visionSection) return

  // Create canvas for grid animation if it doesn't exist
  let gridCanvas = visionSection.querySelector(".grid-animation")
  if (!gridCanvas) {
    gridCanvas = document.createElement("canvas")
    gridCanvas.classList.add("grid-animation")
    visionSection.appendChild(gridCanvas)
  }

  // Set up Three.js scene
  const renderer = new THREE.WebGLRenderer({
    canvas: gridCanvas,
    alpha: true,
    antialias: true,
  })

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, visionSection.clientWidth / visionSection.clientHeight, 0.1, 1000)
  camera.position.z = 5
  camera.position.y = 1
  camera.lookAt(0, 0, 0)

  // Resize handler
  function handleResize() {
    const width = visionSection.clientWidth
    const height = visionSection.clientHeight
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  window.addEventListener("resize", handleResize)
  handleResize()

  // Create grid
  const gridSize = 20
  const gridDivisions = 20
  const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0xffd700, 0xdaa520)
  gridHelper.position.y = -2
  gridHelper.material.transparent = true
  gridHelper.material.opacity = 0.3
  scene.add(gridHelper)

  // Create trading chart lines
  const chartGroup = new THREE.Group()
  scene.add(chartGroup)

  // Create multiple chart lines
  const chartCount = 5
  const charts = []

  for (let c = 0; c < chartCount; c++) {
    // Create a line for each chart
    const points = []
    const pointCount = 100
    const lineWidth = 8 // Width of the chart

    // Generate random chart data with trends
    let value = Math.random() * 2 - 1
    let trend = Math.random() * 0.1 - 0.05

    for (let i = 0; i < pointCount; i++) {
      // Add some randomness to the trend
      trend += Math.random() * 0.02 - 0.01
      // Limit trend to prevent extreme values
      trend = Math.max(-0.1, Math.min(0.1, trend))
      // Update value based on trend
      value += trend
      // Keep value within bounds
      value = Math.max(-2, Math.min(2, value))

      // Create point
      const x = (i / pointCount) * lineWidth - lineWidth / 2
      const y = value
      const z = (c - chartCount / 2) * 0.5

      points.push(new THREE.Vector3(x, y, z))
    }

    // Create line geometry
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

    // Choose color based on overall trend
    const startValue = points[0].y
    const endValue = points[points.length - 1].y
    const isUptrend = endValue > startValue

    const lineMaterial = new THREE.LineBasicMaterial({
      color: isUptrend ? 0x00ff00 : 0xff0000,
      transparent: true,
      opacity: 0.7,
    })

    const line = new THREE.Line(lineGeometry, lineMaterial)
    chartGroup.add(line)

    // Store chart data for animation
    charts.push({
      line,
      points,
      value,
      trend,
      speed: Math.random() * 0.5 + 0.5,
      isUptrend,
    })
  }

  // Add candlestick markers
  const candlesticks = []
  const candlestickMaterial = new THREE.MeshBasicMaterial({
    color: 0xffd700,
    transparent: true,
    opacity: 0.8,
  })

  // Create candlesticks for the main chart (first chart)
  const mainChart = charts[0]
  for (let i = 0; i < 20; i++) {
    const index = i * 5
    if (index < mainChart.points.length - 1) {
      const point = mainChart.points[index]

      // Create candlestick body
      const height = Math.random() * 0.2 + 0.1
      const isGreen = Math.random() > 0.5

      const bodyGeometry = new THREE.BoxGeometry(0.05, height, 0.05)
      const bodyMaterial = new THREE.MeshBasicMaterial({
        color: isGreen ? 0x00ff00 : 0xff0000,
        transparent: true,
        opacity: 0.8,
      })

      const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
      body.position.set(point.x, point.y, point.z)
      chartGroup.add(body)

      // Create candlestick wicks
      const wickGeometry = new THREE.BoxGeometry(0.01, height * 2, 0.01)
      const wick = new THREE.Mesh(wickGeometry, candlestickMaterial)
      wick.position.set(point.x, point.y, point.z)
      chartGroup.add(wick)

      candlesticks.push({ body, wick, baseY: point.y })
    }
  }

  // Add floating price labels
  const priceLabels = []
  for (let i = 0; i < 5; i++) {
    const priceGeometry = new THREE.PlaneGeometry(0.5, 0.2)
    const priceCanvas = document.createElement("canvas")
    priceCanvas.width = 128
    priceCanvas.height = 64
    const priceContext = priceCanvas.getContext("2d")

    // Create texture from canvas
    const priceTexture = new THREE.CanvasTexture(priceCanvas)
    const priceMaterial = new THREE.MeshBasicMaterial({
      map: priceTexture,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    })

    const priceLabel = new THREE.Mesh(priceGeometry, priceMaterial)
    priceLabel.position.set(Math.random() * 6 - 3, Math.random() * 3 - 1, Math.random() * 2 - 1)

    chartGroup.add(priceLabel)

    // Store label data
    priceLabels.push({
      mesh: priceLabel,
      context: priceContext,
      texture: priceTexture,
      value: Math.random() * 1000 + 1000,
      trend: Math.random() > 0.5 ? 1 : -1,
      updateSpeed: Math.random() * 0.5 + 0.5,
    })
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate)

    const time = Date.now() * 0.001

    // Update chart lines
    charts.forEach((chart) => {
      // Update trend
      chart.trend += (Math.random() * 0.02 - 0.01) * chart.speed
      chart.trend = Math.max(-0.1, Math.min(0.1, chart.trend))

      // Update value
      chart.value += chart.trend
      chart.value = Math.max(-2, Math.min(2, chart.value))

      // Shift points
      for (let i = 0; i < chart.points.length - 1; i++) {
        chart.points[i].y = chart.points[i + 1].y
      }

      // Add new point
      chart.points[chart.points.length - 1].y = chart.value

      // Update line geometry
      chart.line.geometry.setFromPoints(chart.points)

      // Update line color based on recent trend
      const recentPoints = chart.points.slice(-10)
      const startValue = recentPoints[0].y
      const endValue = recentPoints[recentPoints.length - 1].y
      const isUptrend = endValue > startValue

      if (isUptrend !== chart.isUptrend) {
        chart.isUptrend = isUptrend
        chart.line.material.color.set(isUptrend ? 0x00ff00 : 0xff0000)
      }
    })

    // Update candlesticks
    candlesticks.forEach((candlestick) => {
      // Make candlesticks follow the chart movement
      candlestick.body.position.y = candlestick.baseY + Math.sin(time * 0.5) * 0.1
      candlestick.wick.position.y = candlestick.body.position.y
    })

    // Update price labels
    priceLabels.forEach((label) => {
      // Update price value
      label.value += label.trend * (Math.random() * 2) * label.updateSpeed
      if (label.value < 1000) label.trend = 1
      if (label.value > 2000) label.trend = -1

      // Update label text
      label.context.clearRect(0, 0, 128, 64)
      label.context.fillStyle = label.trend > 0 ? "#00FF00" : "#FF0000"
      label.context.fillRect(0, 0, 128, 64)
      label.context.fillStyle = "#FFFFFF"
      label.context.font = "24px Arial"
      label.context.textAlign = "center"
      label.context.textBaseline = "middle"
      label.context.fillText(label.value.toFixed(2), 64, 32)

      // Update texture
      label.texture.needsUpdate = true

      // Make labels float
      label.mesh.position.y += Math.sin(time * label.updateSpeed) * 0.005

      // Make labels face the camera
      label.mesh.lookAt(camera.position)
    })

    // Rotate chart group
    chartGroup.rotation.y = Math.sin(time * 0.2) * 0.2

    // Rotate grid
    gridHelper.rotation.y += 0.001

    renderer.render(scene, camera)
  }

  animate()
}

/**
 * Mission Section - Enhanced Financial Data Visualization
 * Creates animated flowing lines with financial data points
 */
function initMissionAnimation() {
  const missionCards = document.querySelectorAll(".vision-card")
  if (!missionCards.length) return

  missionCards.forEach((card) => {
    // Create flowing lines container if it doesn't exist
    let flowingLines = card.querySelector(".flowing-lines")
    if (!flowingLines) {
      flowingLines = document.createElement("div")
      flowingLines.classList.add("flowing-lines")
      card.appendChild(flowingLines)
    }

    // Clear existing content
    flowingLines.innerHTML = ""

    // Create flowing lines
    const lineCount = 15 // Increased line count
    for (let i = 0; i < lineCount; i++) {
      const line = document.createElement("div")
      line.classList.add("flowing-line")

      // Randomize position, width, and animation delay
      line.style.top = `${Math.random() * 100}%`
      line.style.width = `${Math.random() * 30 + 20}%`
      line.style.height = `${Math.random() * 1 + 1}px`
      line.style.animationDelay = `${Math.random() * 8}s`
      line.style.animationDuration = `${Math.random() * 4 + 6}s`

      // Add gradient color based on position
      const hue = Math.floor(Math.random() * 60) + 30 // Gold-ish hues
      line.style.background = `linear-gradient(90deg, transparent, hsl(${hue}, 100%, 60%), transparent)`

      flowingLines.appendChild(line)
    }

    // Add data points along the lines
    const dataPointCount = 10
    for (let i = 0; i < dataPointCount; i++) {
      const dataPoint = document.createElement("div")
      dataPoint.classList.add("data-point")

      // Style the data point
      dataPoint.style.position = "absolute"
      dataPoint.style.width = "6px"
      dataPoint.style.height = "6px"
      dataPoint.style.borderRadius = "50%"
      dataPoint.style.background = "#FFD700"
      dataPoint.style.boxShadow = "0 0 5px #FFD700"

      // Position randomly
      dataPoint.style.top = `${Math.random() * 100}%`
      dataPoint.style.left = `${Math.random() * 100}%`

      // Add pulse animation
      dataPoint.style.animation = `pulseNode ${Math.random() * 2 + 2}s infinite alternate`
      dataPoint.style.animationDelay = `${Math.random() * 2}s`

      flowingLines.appendChild(dataPoint)
    }

    // Add financial data labels
    const dataLabels = ["FOREX", "ALGO", "TRADE", "PROFIT", "GROWTH", "INVEST"]

    for (let i = 0; i < 6; i++) {
      const dataLabel = document.createElement("div")
      dataLabel.classList.add("data-label")

      // Style the label
      dataLabel.style.position = "absolute"
      dataLabel.style.color = "rgba(255, 215, 0, 0.2)"
      dataLabel.style.fontSize = `${Math.random() * 10 + 10}px`
      dataLabel.style.fontWeight = "bold"
      dataLabel.style.fontFamily = "monospace"
      dataLabel.style.userSelect = "none"
      dataLabel.style.pointerEvents = "none"

      // Position randomly
      dataLabel.style.top = `${Math.random() * 80 + 10}%`
      dataLabel.style.left = `${Math.random() * 80 + 10}%`
      dataLabel.style.transform = `rotate(${Math.random() * 40 - 20}deg)`

      // Set text
      dataLabel.textContent = dataLabels[i]

      // Add fade animation
      dataLabel.style.animation = `fadeInOut ${Math.random() * 4 + 4}s infinite alternate`
      dataLabel.style.animationDelay = `${Math.random() * 2}s`

      flowingLines.appendChild(dataLabel)
    }

    // Add CSS for new animations
    const style = document.createElement("style")
    style.textContent = `
      @keyframes fadeInOut {
        0%, 100% { opacity: 0.1; }
        50% { opacity: 0.3; }
      }
      
      .data-point {
        z-index: 2;
      }
      
      .data-label {
        z-index: 1;
      }
    `
    document.head.appendChild(style)

    // Add mini chart animation
    const miniChart = document.createElement("div")
    miniChart.classList.add("mini-chart")

    // Style the mini chart
    miniChart.style.position = "absolute"
    miniChart.style.bottom = "10%"
    miniChart.style.right = "10%"
    miniChart.style.width = "100px"
    miniChart.style.height = "50px"
    miniChart.style.opacity = "0.2"
    miniChart.style.pointerEvents = "none"

    // Create chart line
    const chartLine = document.createElement("div")
    chartLine.style.position = "absolute"
    chartLine.style.bottom = "0"
    chartLine.style.left = "0"
    chartLine.style.width = "100%"
    chartLine.style.height = "100%"
    chartLine.style.borderBottom = "1px solid rgba(255, 215, 0, 0.5)"

    miniChart.appendChild(chartLine)

    // Create chart SVG
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width", "100")
    svg.setAttribute("height", "50")
    svg.style.position = "absolute"
    svg.style.top = "0"
    svg.style.left = "0"

    // Create path for chart line
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttribute("stroke", "#FFD700")
    path.setAttribute("stroke-width", "1.5")
    path.setAttribute("fill", "none")

    // Generate random path data
    let pathData = "M0,25"
    for (let i = 1; i <= 10; i++) {
      pathData += ` L${i * 10},${Math.random() * 30 + 10}`
    }
    path.setAttribute("d", pathData)

    // Add animation to make the path "draw" itself
    path.innerHTML = `
      <animate attributeName="stroke-dasharray" from="0,500" to="500,0" dur="3s" begin="0s" fill="freeze" />
    `

    svg.appendChild(path)
    miniChart.appendChild(svg)
    flowingLines.appendChild(miniChart)
  })
}

/**
 * Earn with Us Section - Enhanced Trading Symbols Animation
 * Creates animated floating coins and trading symbols
 */
function initEarnAnimation() {
  const incomeSection = document.querySelector(".income")
  if (!incomeSection) return

  // Create floating coins container if it doesn't exist
  let floatingCoins = incomeSection.querySelector(".floating-coins")
  if (!floatingCoins) {
    floatingCoins = document.createElement("div")
    floatingCoins.classList.add("floating-coins")
    incomeSection.appendChild(floatingCoins)
  }

  // Clear existing content
  floatingCoins.innerHTML = ""

  // Currency symbols to display
  const currencySymbols = ["$", "€", "£", "¥", "₹", "₽", "₿", "Ξ", "₣", "₩"]

  // Create coins and currency symbols
  const coinCount = 30 // Increased count
  for (let i = 0; i < coinCount; i++) {
    const isSymbol = Math.random() > 0.5

    if (isSymbol) {
      // Create currency symbol
      const symbol = document.createElement("div")
      symbol.classList.add("currency-symbol")

      // Randomize position, size, and animation
      symbol.style.position = "absolute"
      symbol.style.left = `${Math.random() * 100}%`
      symbol.style.top = `${Math.random() * 100}%`
      symbol.style.fontSize = `${Math.random() * 20 + 15}px`
      symbol.style.color = `rgba(255, 215, 0, ${Math.random() * 0.5 + 0.3})`
      symbol.style.textShadow = "0 0 5px rgba(255, 215, 0, 0.5)"
      symbol.style.fontWeight = "bold"
      symbol.style.fontFamily = "Arial, sans-serif"
      symbol.style.zIndex = "1"
      symbol.style.animation = `floatSymbol ${Math.random() * 10 + 10}s linear infinite`
      symbol.style.animationDelay = `${Math.random() * 10}s`

      // Set random symbol
      symbol.textContent = currencySymbols[Math.floor(Math.random() * currencySymbols.length)]

      floatingCoins.appendChild(symbol)
    } else {
      // Create coin
      const coin = document.createElement("div")
      coin.classList.add("coin")

      // Randomize position, size, and animation
      coin.style.left = `${Math.random() * 100}%`
      coin.style.width = `${Math.random() * 20 + 15}px`
      coin.style.height = coin.style.width
      coin.style.animationDelay = `${Math.random() * 15}s`
      coin.style.animationDuration = `${Math.random() * 10 + 10}s`

      // Add 3D effect to coins
      coin.style.background = `radial-gradient(circle at 30% 30%, #FFD700, #DAA520)`
      coin.style.boxShadow = `0 0 10px rgba(255, 215, 0, 0.7), inset 0 0 5px rgba(255, 255, 255, 0.5)`

      // Add dollar symbol to coin
      const symbol = document.createElement("span")
      symbol.classList.add("coin-symbol")
      symbol.textContent = "$"
      symbol.style.position = "absolute"
      symbol.style.top = "50%"
      symbol.style.left = "50%"
      symbol.style.transform = "translate(-50%, -50%)"
      symbol.style.color = "rgba(0, 0, 0, 0.5)"
      symbol.style.fontWeight = "bold"

      coin.appendChild(symbol)
      floatingCoins.appendChild(coin)
    }
  }

  // Add trading chart elements
  const chartCount = 3
  for (let i = 0; i < chartCount; i++) {
    const chart = document.createElement("div")
    chart.classList.add("mini-trading-chart")

    // Style the chart
    chart.style.position = "absolute"
    chart.style.width = "80px"
    chart.style.height = "40px"
    chart.style.left = `${Math.random() * 70 + 15}%`
    chart.style.top = `${Math.random() * 70 + 15}%`
    chart.style.opacity = "0.2"
    chart.style.zIndex = "0"

    // Create SVG for chart
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width", "100%")
    svg.setAttribute("height", "100%")
    svg.style.overflow = "visible"

    // Create path for chart line
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")

    // Determine if chart is up or down trend
    const isUpTrend = Math.random() > 0.5
    path.setAttribute("stroke", isUpTrend ? "#00FF00" : "#FF0000")
    path.setAttribute("stroke-width", "1.5")
    path.setAttribute("fill", "none")

    // Generate random path data
    let pathData = "M0,20"
    let prevY = 20
    for (let j = 1; j <= 8; j++) {
      // Create trend-based random movement
      const direction = isUpTrend ? -1 : 1 // Negative is up in SVG
      const change = (Math.random() * 5 + 2) * direction
      const trendFactor = isUpTrend ? j / 4 : -j / 4 // Stronger trend as we go

      const y = Math.max(5, Math.min(35, prevY + change + trendFactor))
      pathData += ` L${j * 10},${y}`
      prevY = y
    }
    path.setAttribute("d", pathData)

    // Add animation to make the path "draw" itself
    path.innerHTML = `
      <animate attributeName="stroke-dasharray" from="0,500" to="500,0" dur="3s" begin="0s" fill="freeze" />
    `

    svg.appendChild(path)
    chart.appendChild(svg)

    // Add to container
    floatingCoins.appendChild(chart)
  }

  // Add CSS for new animations
  const style = document.createElement("style")
  style.textContent = `
    @keyframes floatSymbol {
      0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.5;
      }
      90% {
        opacity: 0.5;
      }
      100% {
        transform: translateY(-100px) rotate(360deg);
        opacity: 0;
      }
    }
    
    .mini-trading-chart {
      animation: float 8s ease-in-out infinite;
      pointer-events: none;
    }
  `
  document.head.appendChild(style)
}

/**
 * Platform Features Section - Enhanced Trading Terminal Animation
 * Creates an animated circuit board with trading terminal elements
 */
function initFeaturesAnimation() {
  const featuresSection = document.querySelector(".features")
  if (!featuresSection) return

  // Create circuit board container if it doesn't exist
  let circuitBoard = featuresSection.querySelector(".circuit-board")
  if (!circuitBoard) {
    circuitBoard = document.createElement("div")
    circuitBoard.classList.add("circuit-board")
    featuresSection.appendChild(circuitBoard)
  }

  // Clear existing content
  circuitBoard.innerHTML = ""

  // Create circuit paths and nodes
  const nodeCount = 20 // Increased node count
  const pathCount = 35 // Increased path count

  // Create nodes
  for (let i = 0; i < nodeCount; i++) {
    const node = document.createElement("div")
    node.classList.add("circuit-node")

    // Randomize position
    node.style.left = `${Math.random() * 90 + 5}%`
    node.style.top = `${Math.random() * 90 + 5}%`
    node.style.animationDelay = `${Math.random() * 3}s`

    // Randomize size for hierarchy
    const size = Math.random() > 0.7 ? 8 : 6
    node.style.width = `${size}px`
    node.style.height = `${size}px`

    // Randomize color for different node types
    if (Math.random() > 0.7) {
      node.style.background = "#00FFFF" // Cyan for special nodes
    }

    circuitBoard.appendChild(node)
  }

  // Create paths
  for (let i = 0; i < pathCount; i++) {
    const path = document.createElement("div")
    path.classList.add("circuit-path")

    // Randomize position and size
    const isHorizontal = Math.random() > 0.5
    const left = Math.random() * 90 + 5
    const top = Math.random() * 90 + 5

    path.style.left = `${left}%`
    path.style.top = `${top}%`

    if (isHorizontal) {
      path.style.width = `${Math.random() * 20 + 5}%`
      path.style.height = "2px"
    } else {
      path.style.height = `${Math.random() * 20 + 5}%`
      path.style.width = "2px"
    }

    // Add data pulse effect to some paths
    if (Math.random() > 0.7) {
      path.classList.add("data-path")
      path.style.position = "absolute"
      path.style.background = "linear-gradient(90deg, transparent, #FFD700, transparent)"
      path.style.backgroundSize = "200% 100%"
      path.style.animation = "dataPathPulse 2s infinite linear"
    }

    circuitBoard.appendChild(path)
  }

  // Add trading terminal elements
  const terminalCount = 3
  for (let i = 0; i < terminalCount; i++) {
    const terminal = document.createElement("div")
    terminal.classList.add("trading-terminal")

    // Style the terminal
    terminal.style.position = "absolute"
    terminal.style.width = "120px"
    terminal.style.height = "80px"
    terminal.style.border = "1px solid rgba(255, 215, 0, 0.3)"
    terminal.style.borderRadius = "4px"
    terminal.style.background = "rgba(0, 0, 0, 0.2)"
    terminal.style.overflow = "hidden"
    terminal.style.opacity = "0.2"
    terminal.style.zIndex = "2"

    // Position terminal
    terminal.style.left = `${Math.random() * 70 + 15}%`
    terminal.style.top = `${Math.random() * 70 + 15}%`

    // Create terminal header
    const header = document.createElement("div")
    header.style.height = "15px"
    header.style.background = "rgba(255, 215, 0, 0.3)"
    header.style.borderBottom = "1px solid rgba(255, 215, 0, 0.5)"
    terminal.appendChild(header)

    // Create terminal content
    const content = document.createElement("div")
    content.style.padding = "5px"
    content.style.fontSize = "6px"
    content.style.color = "rgba(255, 215, 0, 0.7)"
    content.style.fontFamily = "monospace"

    // Add random trading data
    for (let j = 0; j < 5; j++) {
      const dataLine = document.createElement("div")
      dataLine.style.marginBottom = "3px"
      dataLine.style.display = "flex"
      dataLine.style.justifyContent = "space-between"

      const symbol = document.createElement("span")
      symbol.textContent = ["EUR/USD", "GBP/USD", "USD/JPY", "BTC/USD", "ETH/USD"][Math.floor(Math.random() * 5)]
      dataLine.appendChild(symbol)

      const price = document.createElement("span")
      price.textContent = (Math.random() * 1000 + 100).toFixed(2)
      price.style.color = Math.random() > 0.5 ? "#00FF00" : "#FF0000"
      dataLine.appendChild(price)

      content.appendChild(dataLine)
    }

    terminal.appendChild(content)

    // Add blinking cursor
    const cursor = document.createElement("div")
    cursor.style.width = "4px"
    cursor.style.height = "6px"
    cursor.style.background = "#FFD700"
    cursor.style.position = "absolute"
    cursor.style.bottom = "5px"
    cursor.style.left = "5px"
    cursor.style.animation = "blink 1s infinite"
    terminal.appendChild(cursor)

    circuitBoard.appendChild(terminal)
  }

  // Add binary data streams
  const dataStreamCount = 5
  for (let i = 0; i < dataStreamCount; i++) {
    const dataStream = document.createElement("div")
    dataStream.classList.add("binary-stream")

    // Style the data stream
    dataStream.style.position = "absolute"
    dataStream.style.width = "40px"
    dataStream.style.height = "200px"
    dataStream.style.overflow = "hidden"
    dataStream.style.color = "rgba(255, 215, 0, 0.2)"
    dataStream.style.fontSize = "8px"
    dataStream.style.fontFamily = "monospace"
    dataStream.style.lineHeight = "1"
    dataStream.style.textAlign = "center"
    dataStream.style.zIndex = "1"

    // Position data stream
    dataStream.style.left = `${Math.random() * 90 + 5}%`
    dataStream.style.top = `${Math.random() * 50}%`

    // Generate binary content
    let binaryContent = ""
    for (let j = 0; j < 30; j++) {
      binaryContent += Math.random() > 0.5 ? "1" : "0"
      if ((j + 1) % 8 === 0) binaryContent += "<br>"
    }
    dataStream.innerHTML = binaryContent

    // Add animation
    dataStream.style.animation = `binaryStream ${Math.random() * 5 + 10}s linear infinite`
    dataStream.style.animationDelay = `${Math.random() * 5}s`

    circuitBoard.appendChild(dataStream)
  }

  // Add CSS for new animations
  const style = document.createElement("style")
  style.textContent = `
    @keyframes dataPathPulse {
      0% { background-position: 100% 0; }
      100% { background-position: -100% 0; }
    }
    
    @keyframes blink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    
    @keyframes binaryStream {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100%); }
    }
    
    .trading-terminal {
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.2);
      animation: terminalGlow 3s infinite alternate;
    }
    
    @keyframes terminalGlow {
      0% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.2); }
      100% { box-shadow: 0 0 15px rgba(255, 215, 0, 0.4); }
    }
  `
  document.head.appendChild(style)

  // Animate paths with GSAP
  const paths = circuitBoard.querySelectorAll(".circuit-path:not(.data-path)")
  paths.forEach((path) => {
    gsap.to(path, {
      opacity: 0.8,
      duration: Math.random() * 2 + 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })
  })
}

/**
 * FAQ Section - Enhanced Dynamic Trading Elements
 * Creates a pulsing gradient with trading-related visual elements
 */
function initFaqAnimation() {
  const faqSection = document.querySelector(".faq")
  if (!faqSection) return

  // Create pulsing gradient container if it doesn't exist
  let pulsingGradient = faqSection.querySelector(".pulsing-gradient")
  if (!pulsingGradient) {
    pulsingGradient = document.createElement("div")
    pulsingGradient.classList.add("pulsing-gradient")
    faqSection.appendChild(pulsingGradient)
  }

  // Clear existing content
  pulsingGradient.innerHTML = ""

  // Add multiple gradient circles
  for (let i = 0; i < 3; i++) {
    const gradientCircle = document.createElement("div")
    gradientCircle.classList.add("gradient-circle")
    gradientCircle.style.position = "absolute"
    gradientCircle.style.borderRadius = "50%"
    gradientCircle.style.width = "100%"
    gradientCircle.style.height = "100%"
    gradientCircle.style.background =
      "radial-gradient(circle at center, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0) 70%)"
    gradientCircle.style.opacity = "0.2"
    gradientCircle.style.top = "0"
    gradientCircle.style.left = "0"

    // Randomize animation
    gradientCircle.style.animationDelay = `${i * 2}s`

    pulsingGradient.appendChild(gradientCircle)

    // Animate with GSAP
    gsap.to(gradientCircle, {
      scale: 1.5,
      opacity: 0,
      duration: 4,
      repeat: -1,
      ease: "sine.inOut",
    })
  }

  // Add floating question marks
  const questionMarkCount = 10
  for (let i = 0; i < questionMarkCount; i++) {
    const questionMark = document.createElement("div")
    questionMark.classList.add("floating-question")

    // Style the question mark
    questionMark.style.position = "absolute"
    questionMark.style.fontSize = `${Math.random() * 20 + 10}px`
    questionMark.style.color = "rgba(255, 215, 0, 0.1)"
    questionMark.style.fontWeight = "bold"
    questionMark.textContent = "?"

    // Position randomly
    questionMark.style.left = `${Math.random() * 90 + 5}%`
    questionMark.style.top = `${Math.random() * 90 + 5}%`

    // Add floating animation
    questionMark.style.animation = `floatQuestion ${Math.random() * 10 + 10}s ease-in-out infinite`
    questionMark.style.animationDelay = `${Math.random() * 5}s`

    pulsingGradient.appendChild(questionMark)
  }

  // Add trading symbols in background
  const tradingSymbols = ["FOREX", "ALGO", "MT4", "TRADE", "PROFIT", "CHART", "SIGNAL"]
  for (let i = 0; i < 7; i++) {
    const symbol = document.createElement("div")
    symbol.classList.add("background-symbol")

    // Style the symbol
    symbol.style.position = "absolute"
    symbol.style.fontSize = `${Math.random() * 30 + 20}px`
    symbol.style.color = "rgba(255, 215, 0, 0.03)"
    symbol.style.fontWeight = "bold"
    symbol.style.fontFamily = "monospace"
    symbol.style.userSelect = "none"
    symbol.style.pointerEvents = "none"
    symbol.style.zIndex = "0"
    symbol.textContent = tradingSymbols[i]

    // Position randomly
    symbol.style.left = `${Math.random() * 70 + 15}%`
    symbol.style.top = `${Math.random() * 70 + 15}%`
    symbol.style.transform = `rotate(${Math.random() * 20 - 10}deg)`

    // Add pulse animation
    symbol.style.animation = `symbolPulse ${Math.random() * 5 + 5}s ease-in-out infinite`

    pulsingGradient.appendChild(symbol)
  }

  // Add CSS for new animations
  const style = document.createElement("style")
  style.textContent = `
    @keyframes floatQuestion {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(10deg); }
    }
    
    @keyframes symbolPulse {
      0%, 100% { opacity: 0.03; transform: scale(1) rotate(0deg); }
      50% { opacity: 0.06; transform: scale(1.1) rotate(5deg); }
    }
  `
  document.head.appendChild(style)
}

/**
 * Contact Section - Enhanced Interactive Trading Particles
 * Creates particles that form trading-related shapes
 */
function initContactAnimation() {
  const contactSection = document.querySelector(".contact")
  if (!contactSection) return

  // Create interactive particles container if it doesn't exist
  let interactiveParticles = contactSection.querySelector(".interactive-particles")
  if (!interactiveParticles) {
    interactiveParticles = document.createElement("div")
    interactiveParticles.classList.add("interactive-particles")
    contactSection.appendChild(interactiveParticles)
  }

  // Set up Three.js scene
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(contactSection.clientWidth, contactSection.clientHeight)
  renderer.domElement.style.position = "absolute"
  renderer.domElement.style.top = "0"
  renderer.domElement.style.left = "0"
  renderer.domElement.style.width = "100%"
  renderer.domElement.style.height = "100%"
  renderer.domElement.style.pointerEvents = "none"
  interactiveParticles.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, contactSection.clientWidth / contactSection.clientHeight, 0.1, 1000)
  camera.position.z = 5

  // Resize handler
  function handleResize() {
    const width = contactSection.clientWidth
    const height = contactSection.clientHeight
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  window.addEventListener("resize", handleResize)
  handleResize()

  // Create particles
  const particleCount = 150 // Increased particle count
  const particles = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const sizes = new Float32Array(particleCount)

  // Create different particle groups for shapes
  const particleGroups = [
    { name: "scatter", count: 50 },
    { name: "dollar", count: 50 },
    { name: "chart", count: 50 },
  ]

  let particleIndex = 0

  // Create scattered particles
  for (let i = 0; i < particleGroups[0].count; i++) {
    const i3 = particleIndex * 3
    positions[i3] = (Math.random() - 0.5) * 10
    positions[i3 + 1] = (Math.random() - 0.5) * 10
    positions[i3 + 2] = (Math.random() - 0.5) * 10

    // Gold color with slight variations
    colors[i3] = 1.0 // R: Full red
    colors[i3 + 1] = 0.8 + Math.random() * 0.2 // G: Mostly full green
    colors[i3 + 2] = 0.0 // B: No blue

    sizes[particleIndex] = Math.random() * 0.1 + 0.05
    particleIndex++
  }

  // Create dollar sign shape
  const dollarPoints = []
  // Vertical line
  for (let i = 0; i < 10; i++) {
    dollarPoints.push({ x: 0, y: -1.5 + i * 0.3, z: 0 })
  }
  // Top curve
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI
    dollarPoints.push({
      x: Math.sin(angle) * 0.8,
      y: 1 + Math.cos(angle) * 0.5,
      z: 0,
    })
  }
  // Middle curve
  for (let i = 0; i < 10; i++) {
    const angle = Math.PI + (i / 10) * Math.PI
    dollarPoints.push({
      x: Math.sin(angle) * 0.8,
      y: 0 + Math.cos(angle) * 0.5,
      z: 0,
    })
  }

  // Add dollar points to particles
  for (let i = 0; i < particleGroups[1].count; i++) {
    const i3 = particleIndex * 3

    // Get point from dollar shape or random if not enough points
    let point
    if (i < dollarPoints.length) {
      point = dollarPoints[i]
    } else {
      const randomIndex = Math.floor(Math.random() * dollarPoints.length)
      point = dollarPoints[randomIndex]
      // Add some randomness
      point = {
        x: point.x + (Math.random() - 0.5) * 0.2,
        y: point.y + (Math.random() - 0.5) * 0.2,
        z: point.z + (Math.random() - 0.5) * 0.2,
      }
    }

    positions[i3] = point.x + 3 // Offset to the right
    positions[i3 + 1] = point.y
    positions[i3 + 2] = point.z

    // Gold color
    colors[i3] = 1.0
    colors[i3 + 1] = 0.8 + Math.random() * 0.2
    colors[i3 + 2] = 0.0

    sizes[particleIndex] = Math.random() * 0.1 + 0.05
    particleIndex++
  }

  // Create chart line shape
  const chartPoints = []
  // Generate random chart line
  let prevY = 0
  for (let i = 0; i < 20; i++) {
    const x = -3 + i * 0.3
    const change = (Math.random() - 0.5) * 0.5
    prevY += change
    prevY = Math.max(-1.5, Math.min(1.5, prevY))
    chartPoints.push({ x, y: prevY, z: 0 })
  }

  // Add chart points to particles
  for (let i = 0; i < particleGroups[2].count; i++) {
    const i3 = particleIndex * 3

    // Get point from chart shape or random if not enough points
    let point
    if (i < chartPoints.length) {
      point = chartPoints[i]
    } else {
      const randomIndex = Math.floor(Math.random() * chartPoints.length)
      point = chartPoints[randomIndex]
      // Add some random

      point = {
        x: point.x + (Math.random() - 0.5) * 0.2,
        y: point.y + (Math.random() - 0.5) * 0.2,
        z: point.z + (Math.random() - 0.5) * 0.2,
      }
    }

    positions[i3] = point.x
    positions[i3 + 1] = point.y - 2 // Offset to the bottom
    positions[i3 + 2] = point.z

    // Determine color based on trend (green for up, red for down)
    if (i > 0 && i < chartPoints.length) {
      const isUp = chartPoints[i].y > chartPoints[i - 1].y
      if (isUp) {
        colors[i3] = 0.0 // R
        colors[i3 + 1] = 1.0 // G
        colors[i3 + 2] = 0.0 // B
      } else {
        colors[i3] = 1.0 // R
        colors[i3 + 1] = 0.0 // G
        colors[i3 + 2] = 0.0 // B
      }
    } else {
      // Default gold for other particles
      colors[i3] = 1.0
      colors[i3 + 1] = 0.8 + Math.random() * 0.2
      colors[i3 + 2] = 0.0
    }

    sizes[particleIndex] = Math.random() * 0.1 + 0.05
    particleIndex++
  }

  // Set attributes for the particles
  particles.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  particles.setAttribute("color", new THREE.BufferAttribute(colors, 3))
  particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

  // Create particle material
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  })

  // Create particle system
  const particleSystem = new THREE.Points(particles, particleMaterial)
  scene.add(particleSystem)

  // Animation loop
  function animate() {
    requestAnimationFrame(animate)

    const time = Date.now() * 0.001

    // Rotate particle system
    particleSystem.rotation.y = time * 0.1
    particleSystem.rotation.x = Math.sin(time * 0.2) * 0.2

    // Pulse particles
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const scale = 1 + 0.3 * Math.sin(time * 2 + i * 0.1)
      sizes[i] = (Math.random() * 0.1 + 0.05) * scale
    }
    particleSystem.geometry.attributes.size.needsUpdate = true

    renderer.render(scene, camera)
  }

  animate()

  // Add mouse interaction
  let mouseX = 0
  let mouseY = 0
  let targetX = 0
  let targetY = 0

  function onDocumentMouseMove(event) {
    const rect = contactSection.getBoundingClientRect()
    mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1
  }

  document.addEventListener("mousemove", onDocumentMouseMove, false)

  // Update animation loop to include mouse interaction
  function updateParticles() {
    targetX = mouseX * 0.5
    targetY = mouseY * 0.5

    particleSystem.rotation.x += (targetY - particleSystem.rotation.x) * 0.05
    particleSystem.rotation.y += (targetX - particleSystem.rotation.y) * 0.05

    requestAnimationFrame(updateParticles)
  }

  updateParticles()
}

/**
 * Disclaimer Section - Secure Pattern Animation
 * Creates a secure pattern background with shield animation
 */
function initDisclaimerAnimation() {
  const disclaimerSection = document.querySelector(".disclaimer")
  if (!disclaimerSection) return

  // Create secure pattern container if it doesn't exist
  let securePattern = disclaimerSection.querySelector(".secure-pattern")
  if (!securePattern) {
    securePattern = document.createElement("div")
    securePattern.classList.add("secure-pattern")
    disclaimerSection.appendChild(securePattern)
  }

  // Create shield animation container
  let shieldAnimation = disclaimerSection.querySelector(".shield-animation")
  if (!shieldAnimation) {
    shieldAnimation = document.createElement("div")
    shieldAnimation.classList.add("shield-animation")
    disclaimerSection.appendChild(shieldAnimation)
  }

  // Create shield elements
  for (let i = 0; i < 3; i++) {
    const shield = document.createElement("div")
    shield.classList.add("shield")
    shield.style.animationDelay = `${i * 0.5}s`
    shieldAnimation.appendChild(shield)
  }

  // Add lock icon to the center of the shield
  const lockIcon = document.createElement("i")
  lockIcon.className = "fas fa-lock"
  lockIcon.style.position = "absolute"
  lockIcon.style.top = "50%"
  lockIcon.style.left = "50%"
  lockIcon.style.transform = "translate(-50%, -50%)"
  lockIcon.style.fontSize = "40px"
  lockIcon.style.color = "rgba(255, 215, 0, 0.2)"
  lockIcon.style.zIndex = "1"
  shieldAnimation.appendChild(lockIcon)

  // Animate lock icon with GSAP
  gsap.to(lockIcon, {
    scale: 1.2,
    opacity: 0.5,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  })
}

