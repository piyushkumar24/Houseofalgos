/**
 * House of Algo's - Charts JavaScript
 * This file contains functionality for the performance charts
 */

document.addEventListener('DOMContentLoaded', () => {
    // Performance Chart
    const performanceChartEl = document.getElementById('performanceChart');
    
    if (performanceChartEl) {
        // Sample data for the chart
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Create chart
        const performanceChart = new Chart(performanceChartEl, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'Conservative Strategy',
                        data: [1.2, 1.5, 1.8, 1.3, 1.6, 1.9, 2.1, 1.7, 2.0, 2.2, 1.9, 2.3],
                        borderColor: '#4CAF50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Balanced Strategy',
                        data: [2.1, 2.5, 2.2, 2.7, 2.3, 2.8, 3.0, 2.6, 3.2, 3.5, 3.1, 3.7],
                        borderColor: '#2196F3',
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Aggressive Strategy',
                        data: [3.2, 3.8, 3.5, 4.1, 3.7, 4.3, 4.5, 4.0, 4.7, 5.0, 4.5, 5.2],
                        borderColor: '#FFC107',
                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            },
                            color: 'rgba(255, 255, 255, 0.7)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                elements: {
                    point: {
                        radius: 3,
                        hoverRadius: 6
                    }
                }
            }
        });
        
        // Feature tabs functionality
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                
                // Remove active class from all buttons and panes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                
                // Add active class to current button and pane
                btn.classList.add('active');
                document.getElementById(tabId).classList.add('active');
                
                // Resize chart if performance tab is active
                if (tabId === 'performance') {
                    performanceChart.resize();
                }
            });
        });
    }
    
    // Map initialization
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // This is a placeholder for a real map implementation
        // You would typically use Google Maps, Mapbox, or another mapping service
        
        // For demonstration, we'll just add a click event to the placeholder
        mapElement.addEventListener('click', () => {
            alert('Map functionality would be implemented with a mapping service like Google Maps or Mapbox.');
        });
    }
});