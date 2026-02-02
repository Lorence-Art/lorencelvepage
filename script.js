document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const welcomeScreen = document.getElementById('welcome-screen');
    const proposalScreen = document.getElementById('proposal-screen');
    const passwordScreen = document.getElementById('password-screen');
    const startBtn = document.getElementById('start-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const noMessage = document.getElementById('no-message');
    const tryAgainBtn = document.getElementById('try-again-btn');
    const mysteryPassword = document.getElementById('mystery-password');
    const revealPasswordBtn = document.getElementById('reveal-password-btn');
    const submitPasswordBtn = document.getElementById('submit-password-btn');
    const attemptMessage = document.getElementById('attempt-message');
    const surpriseContent = document.getElementById('surprise-content');
    const backToProposalBtn = document.getElementById('back-to-proposal-btn');
    const confettiContainer = document.getElementById('confetti-container');
    
    // Variables
    let noButtonClicks = 0;
    let passwordAttempts = 0;
    const maxNoClicks = 4;
    const correctPassword = "dasdsah1332455353"; 
    
    // Array of messages for each click on "No" button
    const noButtonMessages = [
        "Sure na ba yan bebe?",
        "Sige na minsan lang to oh😞",
        "Wait lang😔",
        "System: Removing the button this button 😤"
    ];
    
    // Initialize Countdown to Valentine's Day
    initializeCountdown();
    
    // Start Button - Welcome to Proposal
    startBtn.addEventListener('click', function() {
        // Animate exit of welcome screen
        welcomeScreen.style.opacity = '0';
        
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            proposalScreen.style.display = 'block';
            
            // Animate entrance of proposal screen
            proposalScreen.style.opacity = '0';
            proposalScreen.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                proposalScreen.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                proposalScreen.style.opacity = '1';
                proposalScreen.style.transform = 'translateY(0)';
            }, 50);
        }, 800);
    });
    
    // YES Button - Go to Password Mystery
    yesBtn.addEventListener('click', function() {
        // Create confetti celebration
        createConfetti();
        
        // Play happy sound
        playSound('happy');
        
        // Animate transition to password screen
        proposalScreen.style.opacity = '0';
        proposalScreen.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            proposalScreen.style.display = 'none';
            passwordScreen.style.display = 'block';
            
            // Animate entrance of password screen
            passwordScreen.style.opacity = '0';
            setTimeout(() => {
                passwordScreen.style.transition = 'opacity 0.8s ease';
                passwordScreen.style.opacity = '1';
            }, 50);
        }, 800);
    });
    
    // NO Button - Moving button with funny messages
    noBtn.addEventListener('click', function() {
        noButtonClicks++;
        
        // Show message for this click
        const messageIndex = Math.min(noButtonClicks - 1, noButtonMessages.length - 1);
        showNoButtonMessage(noButtonMessages[messageIndex]);
        
        if (noButtonClicks <= maxNoClicks) {
            // Move the button to a random position
            moveNoButton();
            
            // Play sad sound on first click
            if (noButtonClicks === 1) {
                playSound('sad');
            }
            
            // On last click, hide button and show funny message
            if (noButtonClicks === maxNoClicks) {
                setTimeout(() => {
                    noBtn.style.display = 'none';
                    noMessage.style.display = 'block';
                    
                    // Animate the funny message
                    noMessage.style.animation = 'fadeIn 3s ease';
                    
                    // Also show the "Try again" button
                    tryAgainBtn.style.display = 'flex';
                    
                    // Clear any previous no button messages
                    const existingMessage = document.querySelector('.no-click-message');
                    if (existingMessage) {
                        existingMessage.remove();
                    }
                }, 500);
            }
        }
    });
    
    // Function to move the "No" button
    function moveNoButton() {
        const responseButtons = document.querySelector('.response-buttons');
        const proposalContent = document.querySelector('.proposal-content');
        
        // Get dimensions
        const buttonWidth = noBtn.offsetWidth;
        const buttonHeight = noBtn.offsetHeight;
        
        // Get container dimensions
        const containerWidth = proposalContent.offsetWidth;
        const containerHeight = proposalContent.offsetHeight;
        
        // Check if mobile
        const isMobile = window.innerWidth <= 768;
        
        // Calculate boundaries
        let maxX, maxY, minX, minY;
        
        if (isMobile) {
            // On mobile, use the entire proposal content area
            minX = 20;
            minY = responseButtons.offsetTop;
            maxX = containerWidth - buttonWidth - 20;
            maxY = containerHeight - buttonHeight - 20;
        } else {
            // On desktop, use the response buttons area
            minX = 20;
            minY = responseButtons.offsetTop;
            maxX = containerWidth - buttonWidth - 20;
            maxY = responseButtons.offsetTop + responseButtons.offsetHeight - buttonHeight - 20;
        }
        
        // Ensure valid dimensions
        if (maxX > minX && maxY > minY) {
            // Generate random position
            const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
            const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
            
            // Apply the new position
            noBtn.style.position = 'absolute';
            noBtn.style.left = `${randomX}px`;
            noBtn.style.top = `${randomY}px`;
            noBtn.style.zIndex = '100';
            
            // Add visual feedback
            noBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                noBtn.style.transform = 'scale(1)';
            }, 150);
        }
    }
    
    // Function to show messages when "No" button is clicked
    function showNoButtonMessage(message) {
        // Remove any existing message
        const existingMessage = document.querySelector('.no-click-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message element
        const messageElement = document.createElement('div');
        messageElement.className = 'no-click-message';
        messageElement.textContent = message;
        
        // Get button position for mobile positioning
        const buttonRect = noBtn.getBoundingClientRect();
        const containerRect = document.querySelector('.proposal-content').getBoundingClientRect();
        
        // Position the message above the button
        messageElement.style.position = 'fixed';
        messageElement.style.top = `${buttonRect.top - 50}px`;
        messageElement.style.left = `${buttonRect.left + (buttonRect.width / 2)}px`;
        messageElement.style.transform = 'translateX(-50%)';
        
        // Add to body to ensure it's above everything
        document.body.appendChild(messageElement);
        
        // Auto-remove after animation
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 2000);
    }
    
    // Try Again Button (after "No" button disappears)
    tryAgainBtn.addEventListener('click', function() {
        // Reset the no button
        noButtonClicks = 0;
        noBtn.style.display = 'flex';
        noBtn.style.position = 'static';
        noMessage.style.display = 'none';
        tryAgainBtn.style.display = 'none';
        
        // Remove any existing message
        const existingMessage = document.querySelector('.no-click-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Trigger the YES button click
        yesBtn.click();
    });
    
    // Show/Hide Password Toggle
    revealPasswordBtn.addEventListener('click', function() {
        if (mysteryPassword.type === 'password') {
            mysteryPassword.type = 'text';
            revealPasswordBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
            mysteryPassword.type = 'password';
            revealPasswordBtn.innerHTML = '<i class="fas fa-eye"></i>';
        }
    });
    
    // Submit Password Button
    submitPasswordBtn.addEventListener('click', checkPassword);
    
    // Enter key for password input
    mysteryPassword.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            checkPassword();
        }
    });
    
    // Password checking function
    function checkPassword() {
        const enteredPassword = mysteryPassword.value.trim();
        
        if (!enteredPassword) {
            attemptMessage.textContent = "Please enter a password!";
            attemptMessage.style.color = "#ff9800";
            return;
        }
        
        passwordAttempts++;
        
        if (enteredPassword === correctPassword) {
            // Correct password - show surprise content
            attemptMessage.textContent = "🎉 Correct! Unlocking your surprise... 🎉";
            attemptMessage.style.color = "#4CAF50";
            
            // Shake animation for success
            submitPasswordBtn.classList.add('shake');
            setTimeout(() => {
                submitPasswordBtn.classList.remove('shake');
            }, 500);
            
            // Hide password input and show surprise
            setTimeout(() => {
                document.querySelector('.mystery-box').style.display = 'none';
                surpriseContent.style.display = 'block';
                
                // Create confetti celebration
                createConfetti();
                playSound('happy');
            }, 1500);
            
        } else {
            // Wrong password - show funny messages
            if (passwordAttempts === 1) {
                attemptMessage.textContent = "Wag makulit sa 14 pa yan! 😤";
                attemptMessage.style.color = "#ff5722";
                
                // Shake animation
                mysteryPassword.classList.add('shake');
                setTimeout(() => {
                    mysteryPassword.classList.remove('shake');
                }, 500);
                
            } else if (passwordAttempts === 2) {
                attemptMessage.textContent = "Pisilin kita itlog! 🤬";
                attemptMessage.style.color = "#f44336";
                
                // More intense shake
                mysteryPassword.classList.add('shake');
                submitPasswordBtn.classList.add('shake');
                setTimeout(() => {
                    mysteryPassword.classList.remove('shake');
                    submitPasswordBtn.classList.remove('shake');
                }, 500);
                
                // Disable further attempts
                setTimeout(() => {
                    submitPasswordBtn.disabled = true;
                    mysteryPassword.disabled = true;
                    submitPasswordBtn.innerHTML = '<i class="fas fa-lock"></i> Locked! Wait for Feb 14';
                    submitPasswordBtn.style.opacity = '0.7';
                    submitPasswordBtn.style.cursor = 'not-allowed';
                }, 1000);
                
            } else {
                attemptMessage.textContent = "Sige na, antayin mo na lang Feb 14! 😅";
                attemptMessage.style.color = "#9C27B0";
            }
            
            // Clear the password field
            mysteryPassword.value = '';
            mysteryPassword.focus();
        }
    }
    
    // Back to Proposal Button
    backToProposalBtn.addEventListener('click', function() {
        // Animate exit of password screen
        passwordScreen.style.opacity = '0';
        
        setTimeout(() => {
            passwordScreen.style.display = 'none';
            proposalScreen.style.display = 'block';
            
            // Animate entrance of proposal screen
            proposalScreen.style.opacity = '0';
            setTimeout(() => {
                proposalScreen.style.transition = 'opacity 0.8s ease';
                proposalScreen.style.opacity = '1';
            }, 50);
        }, 800);
    });
    
    // Function to create confetti animation
    function createConfetti() {
        // Clear any existing confetti
        confettiContainer.innerHTML = '';
        
        // Create confetti pieces
        const colors = ['#e91e63', '#f06292', '#f48fb1', '#ff80ab', '#ffc1e3'];
        const confettiCount = 150;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 10 + 5}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.position = 'fixed';
            confetti.style.top = '-10px';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.opacity = Math.random() + 0.5;
            confetti.style.zIndex = '999';
            
            confettiContainer.appendChild(confetti);
            
            // Animate the confetti
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
            });
            
            // Remove confetti after animation completes
            animation.onfinish = () => {
                confetti.remove();
            };
        }
    }
    
    // Function to play sounds
    function playSound(type) {
        try {
            // Create audio context
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create oscillator and gain node
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            if (type === 'happy') {
                // Happy sound - ascending tones
                oscillator.type = 'sine';
                const now = audioContext.currentTime;
                
                oscillator.frequency.setValueAtTime(523.25, now); // C5
                oscillator.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
                oscillator.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
                
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                
                oscillator.start(now);
                oscillator.stop(now + 0.3);
                
            } else if (type === 'sad') {
                // Sad sound - descending tones
                oscillator.type = 'sine';
                const now = audioContext.currentTime;
                
                oscillator.frequency.setValueAtTime(392.00, now); // G4
                oscillator.frequency.exponentialRampToValueAtTime(349.23, now + 0.2); // F4
                oscillator.frequency.exponentialRampToValueAtTime(293.66, now + 0.4); // D4
                
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
                
                oscillator.start(now);
                oscillator.stop(now + 0.6);
            }
        } catch (e) {
            console.log("Audio not supported in this environment");
        }
    }
    
    // Function to initialize countdown to Valentine's Day
    function initializeCountdown() {
        // Set target date to February 14, 2024
        const valentinesDay = new Date('February 14, 2024 00:00:00').getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = valentinesDay - now;
            
            if (timeLeft > 0) {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                // Update countdown display if elements exist
                const daysEl = document.getElementById('days');
                const hoursEl = document.getElementById('hours');
                const minutesEl = document.getElementById('minutes');
                const secondsEl = document.getElementById('seconds');
                
                if (daysEl) daysEl.textContent = days;
                if (hoursEl) hoursEl.textContent = hours;
                if (minutesEl) minutesEl.textContent = minutes;
                if (secondsEl) secondsEl.textContent = seconds;
            }
        }
        
        // Update countdown every second
        setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call
    }
    
    // Add touch event for better mobile support
    noBtn.addEventListener('touchstart', function(e) {
        // Prevent default to avoid any unwanted behavior
        e.preventDefault();
        
        // Add a visual feedback for touch
        this.style.transform = 'scale(0.95)';
    });
    
    noBtn.addEventListener('touchend', function(e) {
        // Restore scale
        this.style.transform = 'scale(1)';
    });
    
    // Preload some assets for smoother experience
    window.addEventListener('load', function() {
        // Add a slight delay to show the welcome screen beautifully
        setTimeout(() => {
            welcomeScreen.style.opacity = '1';
        }, 300);
    });
});