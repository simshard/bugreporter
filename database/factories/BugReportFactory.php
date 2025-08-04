<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BugReport>
 */
class BugReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(4, true),
            'description' => $this->faker->paragraph(),
            'severity' => $this->faker->randomElement(['low', 'medium', 'high']),
        ];
    }
}
