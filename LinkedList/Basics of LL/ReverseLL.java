public class ReverseLL {
  public static class Node {
    int data;
    Node next;

    public Node(int data) {
      this.data = data;
      this.next = null;
    }

  }

  public static Node head;

  // To Reverse the LinkedList
  public void reverse() {
    Node prev = null;
    Node curr = head;
    Node next;

    while (curr != null) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    head = prev;
  }

  // Find and Remove nth node from end
  public int removeNthFromLast(int n, int size) {
    if (head == null)
      return -1;

    int idx = size - n;
    if (idx == 0) {
      int val = head.data;
      head = head.next;
      return val;
    }

    Node temp = head;
    for (int i = 0; i < idx - 1; i++) {
      temp = temp.next;
    }
    int val = temp.next.data;
    temp.next = temp.next.next;
    return val;
  }

  // To check if ll is palindrome
  public boolean isPalindrome(Node temp) {
    if (temp == null || temp.next == null)
      return true;

    // To find MidNode
    Node slow = temp;
    Node fast = temp;
    while (fast != null && fast.next != null) {
      slow = slow.next;
      fast = fast.next.next;
    }

    // To reverse 2nd half of LinkedList
    Node curr = slow.next;
    Node prev = null;
    Node next;
    while (curr != null) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    // To verify left half and right half
    Node right = prev;
    while (temp != null && right != null) {
      if (temp.data != right.data) {
        return false;
      }
      temp = temp.next;
      right = right.next;
    }
    return true;
  }

  // To Print the LinkedList
  public void print() {
    if (head == null) {
      System.out.println("LinkedList is Empty");
      return;
    }

    Node temp = head;
    while (temp != null) {
      System.out.print(temp.data + "->");
      temp = temp.next;
    }
    System.out.println("null");
  }

  public static void main(String[] args) {
    head = new Node(1);
    head.next = new Node(2);
    head.next.next = new Node(2);
    head.next.next.next = new Node(1);
    ReverseLL ll = new ReverseLL();
    ll.print();
    // ll.reverse();
    // ll.print();
    // System.out.println(ll.removeNthFromLast(3, 3));
    // ll.print();
    System.out.println(ll.isPalindrome(head));
  }
}
