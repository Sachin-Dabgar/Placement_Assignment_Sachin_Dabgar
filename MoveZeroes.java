public class Solution {
    public void moveZeroes(int[] nums) {
        int n = nums.length;
        int zeroCount = 0;

        // Count the number of zeros
        for (int num : nums) {
            if (num == 0) {
                zeroCount++;
            }
        }

        // Overwrite non-zero elements to the front of the array
        int i = 0;
        for (int num : nums) {
            if (num != 0) {
                nums[i] = num;
                i++;
            }
        }

        // Append zeros at the end of the array
        while (zeroCount > 0) {
            nums[i] = 0;
            i++;
            zeroCount--;
        }
    }

    public static void main(String[] args) {
        int[] nums = {0, 1, 0, 3, 12};
        Solution solution = new Solution();
        solution.moveZeroes(nums);

        // Print the modified array
        for (int num : nums) {
            System.out.print(num + " ");
        }
        // Output: 1 3 12 0 0
    }
}
