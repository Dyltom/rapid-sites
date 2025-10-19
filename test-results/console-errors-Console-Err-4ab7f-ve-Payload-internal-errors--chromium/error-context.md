# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e6] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e7]:
      - img [ref=e8]
    - generic [ref=e11]:
      - button "Open issues overlay" [ref=e12]:
        - generic [ref=e13]:
          - generic [ref=e14]: "1"
          - generic [ref=e15]: "2"
        - generic [ref=e16]:
          - text: Issue
          - generic [ref=e17]: s
      - button "Collapse issues badge" [ref=e18]:
        - img [ref=e19]
  - alert [ref=e21]
  - generic [ref=e24]:
    - heading "Admin Panel Error" [level=1] [ref=e25]
    - paragraph [ref=e26]: An error occurred in the admin panel.
    - generic [ref=e27]:
      - link "Go Home" [ref=e28] [cursor=pointer]:
        - /url: /
      - link "View Demo" [ref=e29] [cursor=pointer]:
        - /url: /demo
    - group [ref=e30]:
      - generic "Error Details" [ref=e31] [cursor=pointer]
```