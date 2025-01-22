function upto2Digit(a)//upscales all numbers/strings to 2 chars
{
    if (Number(a)<10)
        a='0'+String(a);
    return a;
}

export default upto2Digit;