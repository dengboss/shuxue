function generateProblems() {
    const operationType = document.getElementById('operationType').value;
    const difficulty = document.getElementById('difficulty').value;
    const count = parseInt(document.getElementById('problemCount').value);
    
    const maxNumber = {
        'easy': 10,
        'medium': 20,
        'hard': 100
    }[difficulty];
    
    const problemList = document.getElementById('problemList');
    problemList.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const problem = generateProblem(operationType, maxNumber);
        const div = document.createElement('div');
        div.className = 'problem';
        div.innerHTML = `
            <span class="problem-number">${i + 1}</span>
            <span class="problem-content">${problem.question} = 
            <span class="answer">${problem.answer}</span></span>
        `;
        problemList.appendChild(div);
    }
}

function generateProblem(type, max) {
    let num1 = Math.floor(Math.random() * max) + 1;
    let num2 = Math.floor(Math.random() * max) + 1;
    let num3, operator;
    let question, answer;
    
    switch (type) {
        case 'add':
            question = `${num1} + ${num2}`;
            answer = num1 + num2;
            break;
        case 'subtract':
            // 确保结果为正数
            if (num1 < num2) [num1, num2] = [num2, num1];
            question = `${num1} - ${num2}`;
            answer = num1 - num2;
            break;
        case 'multiply':
            question = `${num1} × ${num2}`;
            answer = num1 * num2;
            break;
        case 'divide':
            // 确保能整除
            answer = Math.floor(Math.random() * max) + 1;
            num1 = num2 * answer;
            question = `${num1} ÷ ${num2}`;
            break;
        case 'mixed':
            // 生成第三个数字
            num3 = Math.floor(Math.random() * max) + 1;
            // 随机决定运算符顺序（加减或减加）
            operator = Math.random() < 0.5 ? ['+', '-'] : ['-', '+'];
            
            question = `${num1} ${operator[0]} ${num2} ${operator[1]} ${num3}`;
            // 计算结果
            if (operator[0] === '+') {
                answer = num1 + num2;
            } else {
                answer = num1 - num2;
            }
            if (operator[1] === '+') {
                answer += num3;
            } else {
                answer -= num3;
            }
            
            // 如果结果为负数，重新生成题目
            if (answer < 0) {
                return generateProblem(type, max);
            }
            break;
    }
    
    return { question, answer };
}

function toggleAnswers() {
    const answers = document.getElementsByClassName('answer');
    for (let answer of answers) {
        // 获取计算后的样式
        const currentDisplay = window.getComputedStyle(answer).display;
        answer.style.display = currentDisplay === 'none' ? 'inline' : 'none';
    }
}

// 页面加载完成后自动生成一组题目
document.addEventListener('DOMContentLoaded', generateProblems); 