# Math Portal

Math Portal is a lightweight web application for learning and practicing mathematics. It provides interactive problem sets, step-by-step solutions, and progress tracking.

## Features

- Interactive exercises across algebra, calculus, geometry, and statistics
- Step-by-step solution walkthroughs
- User progress tracking and achievements
- Problem generator with adjustable difficulty
- Exportable practice sets

## Installation

1. Clone the repository:

	git clone https://github.com/your-org/math-portal.git

2. Install dependencies:

	npm install

3. Start PostgreSQL locally:

	# Option A: use the included Docker Compose setup
	docker compose up -d

	# Option B: use a native PostgreSQL installation
	# make sure the data directory is initialized and the service is running
	sudo systemctl start postgresql

4. Copy `.env.example` to `.env` and update the values if needed.

5. Start the backend server:

	npm run server

6. Run the frontend development server:

	npm run dev

## Usage

- Open http://localhost:5173 in your browser
- Create an account or use the demo mode to start practicing

## Contribution

Contributions are welcome. Please open issues for bugs or feature requests and submit pull requests for changes.

## License

This project is licensed under the MIT License.

## Contact

Maintainer: thr19
Repository: https://github.com/thr19/math-portal
