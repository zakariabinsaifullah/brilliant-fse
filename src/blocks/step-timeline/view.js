// Timeline view script - Horizontal mouse wheel scroll support
document.addEventListener('DOMContentLoaded', function () {
    const timelines = document.querySelectorAll('.wp-block-brilliant-step-timeline .timeline');
    
    timelines.forEach(timeline => {
        // Mouse wheel support for horizontal scroll
        timeline.addEventListener('wheel', (evt) => {
            // Check if horizontal scroll is actually possible/needed
            if (timeline.scrollWidth > timeline.clientWidth) {
                evt.preventDefault();
                timeline.scrollLeft += evt.deltaY;
            }
        }, { passive: false });
    });
});
