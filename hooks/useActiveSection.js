import { useState, useEffect } from 'react';

const useActiveSection = (sections) => {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            let currentSection = '';
            sections.forEach(section => {
                const element = document.getElementById(section);
                const rect = element.getBoundingClientRect();

                // Halfway point of the viewport, adjusted by a margin
                const halfwayPoint = (window.innerHeight / 2) + 100;

                // Check if the section is crossing this halfway point
                const isSectionCrossingHalfway = rect.top < halfwayPoint && rect.bottom > halfwayPoint;

                if (isSectionCrossingHalfway) {
                    currentSection = section;
                }

            });
            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    return activeSection;
};
export default useActiveSection;