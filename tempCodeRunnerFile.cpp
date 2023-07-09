#include<bits/stdc++.h>
using namespace std;
int main(){
    ////#include <iostream>
//////#include <vector>

int maxAlternatingSubarrayLength(std::vector<int>& nums) {
    int maxLength = -1;
    int currentLength = 2;
    
    for (int i = 2; i < nums.size(); i++) {
        if (nums[i] - nums[i - 1] != nums[i - 1] - nums[i - 2]) {
            maxLength = std::max(maxLength, currentLength);
            currentLength = 2;
        } else {
            currentLength++;
        }
    }
    
    return std::max(maxLength, currentLength);
}

int main() {
    std::vector<int> nums = {2, 3, 4, 3, 4};
    int result = maxAlternatingSubarrayLength(nums);
    std::cout << "Maximum length of alternating subarrays: " << result << std::endl;
    
    return 0;
}

}