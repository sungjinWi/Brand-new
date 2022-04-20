function checkprimeNum(num) {
    // 1과 num으로만 나누어 떨어질 때 true
    for(let i = 2; i < num; i++)
    {
        if(num % i ==0)
        {
            return false;
        }
    }
    
    return true;
}

function solution(nums)
{
    let sumNum = 0;
    let result = 0;

    // 숫자 세개를 골라서 합하는 코드
    for(let i =0; i < nums.length; i++) 
    {
        for(let j = i + 1; j <nums.length; j++)
        {
            for(let k = j + 1; k < nums.length; k++)
            {
                sumNum = nums[i] + nums[j] + nums[k];
                // console.log(sumNum)
                // 그 숫자가 소수인지 판단하는 코드

                if(checkprimeNum(sumNum))
                {
                    result++;
                }
            }
        }
    }

    console.log(result)
}

solution([1,2,3,4,7])