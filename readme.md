# Threads-Clone

## Introduction

Threads-Clone is a full-stack social media application inspired by the dynamic and interactive nature of modern social networking. Although it's a work in progress, this application leverages the power of the MERN stack with a twist - using Next.js 14 with server actions, along with MongoDB for the database. The frontend is built using React.js, styled with Tailwind CSS, and animated with Framer Motion. For authentication, Next-Auth is used, while Redux manages the application state. The application also features 'uploadthing' for handling file uploads.

## Features

- **User Authentication**: Secure login, registration, and profile editing, including bio, website, follower and following count.
- **Thread Interactions**: Users can create, delete, update, and bookmark threads. They can also reply to threads and initiate a thread from a parent thread.
- **User Search and Interaction**: Search for users, follow or unfollow them, view their threads, replies, and likes.
- **Activity Log**: A personal log for users to track their activities on the platform.
- **Responsive UI**: Tailored for a seamless experience across various devices.

## Demo

Check out the live demo deployed on Vercel: https://threads-clone-two-amber.vercel.app/

![Screenshot (119)](https://github.com/OliverMorla/threads-clone/assets/73266650/e91986c8-7280-431e-909e-937d0b878360)

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Next.js 14

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/threads-clone.git
   ```
2. Install the dependencies:
   ```bash
   cd threads-clone
   npm install
   ```
3. Set up your environment variables in `.env.local`.

```js

MONGODB_USERNAME=
MONGODB_PASSWORD=
MONGODB_URI=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
OAUTH_SECRET=

```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [@Oliver1129](#)

Project Link: [https://github.com/OliverMorla/threads-clone](https://github.com/OliverMorla/threads-clone)

---

Feel free to adapt this template to better fit your project's specific requirements and personality!
