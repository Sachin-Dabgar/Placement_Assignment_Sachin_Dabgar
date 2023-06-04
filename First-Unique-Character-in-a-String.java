import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int firstUniqChar(String s) {
        // Create a HashMap to store character frequencies
        Map<Character, Integer> charFreq = new HashMap<>();

        // Count the frequencies of each character in the string
        for (char c : s.toCharArray()) {
            charFreq.put(c, charFreq.getOrDefault(c, 0) + 1);
        }

        // Find the first non-repeating character and return its index
        for (int i = 0; i < s.length(); i++) {
            if (charFreq.get(s.charAt(i)) == 1) {
                return i;
            }
        }

        // If no non-repeating character is found, return -1
        return -1;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Example usage:
        String s1 = "leetcode";
        int index1 = solution.firstUniqChar(s1);
        System.out.println("First unique character index in '" + s1 + "': " + index1);
        // Output: 0

        String s2 = "loveleetcode";
        int index2 = solution.firstUniqChar(s2);
        System.out.println("First unique character index in '" + s2 + "': " + index2);
        // Output: 2

        String s3 = "aabb";
        int index3 = solution.firstUniqChar(s3);
        System.out.println("First unique character index in '" + s3 + "': " + index3);
        // Output: -1
    }
}
